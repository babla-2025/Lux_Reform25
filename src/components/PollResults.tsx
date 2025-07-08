'use client'

import { useState, useEffect, useCallback } from 'react'

interface PollOption {
  id: string
  text: string
  votes: number
}

export function PollResults() {
  const [pollData, setPollData] = useState<PollOption[]>([
    { id: 'fairness', text: 'Fairness across households', votes: 77 },
    { id: 'women-incentives', text: 'Incentives for working women', votes: 68 },
    { id: 'budget-neutral', text: 'Budget neutrality', votes: 70 },
    { id: 'simplification', text: 'Simplification of the tax code', votes: 57 },
  ])

  const [userVote, setUserVote] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [lastSync, setLastSync] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [demoMode, setDemoMode] = useState(true) // Enable demo mode for now

  // Backend configuration (set your own API details here)
  const API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || 'DEMO_MODE'
  const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID || 'DEMO_MODE'
  const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

  const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0)

  // Load poll data (real API or demo)
  const loadPollData = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log('🔄 Loading poll data...', demoMode ? '(Demo Mode)' : '(Live API)')
      
      if (!demoMode && API_KEY !== 'DEMO_MODE') {
        // Real API call
        const response = await fetch(API_URL, {
          headers: {
            'X-Master-Key': API_KEY,
            'Cache-Control': 'no-cache'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.record && data.record.options) {
            console.log('📊 Loaded from live API:', data.record)
            setPollData(data.record.options)
            setLastSync(new Date(data.record.lastUpdated || Date.now()))
            return
          }
        }
      }
      
      // Demo mode: load from localStorage to simulate persistence
      const savedData = localStorage.getItem('poll-demo-data')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setPollData(parsed.options)
        setLastSync(new Date(parsed.lastUpdated))
        console.log('📊 Loaded from demo storage:', parsed)
      }
      
    } catch (error) {
      console.error('❌ Error loading poll data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [demoMode, API_KEY, API_URL])

  // Save poll data (real API or demo)
  const savePollData = useCallback(async (newData: PollOption[]) => {
    try {
      const pollUpdate = {
        options: newData,
        lastUpdated: new Date().toISOString(),
        totalVotes: newData.reduce((sum, option) => sum + option.votes, 0)
      }
      
      if (!demoMode && API_KEY !== 'DEMO_MODE') {
        // Real API save
        console.log('💾 Saving to live API...')
        const response = await fetch(API_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
          },
          body: JSON.stringify(pollUpdate)
        })
        
        if (response.ok) {
          console.log('✅ Saved to live API!')
          setLastSync(new Date())
          showUpdateNotification('Vote saved globally! 🌍')
          return
        }
      }
      
      // Demo mode: save to localStorage
      localStorage.setItem('poll-demo-data', JSON.stringify(pollUpdate))
      console.log('💾 Saved to demo storage')
      setLastSync(new Date())
      showUpdateNotification(demoMode ? 'Vote saved! (Demo Mode) 🎭' : 'Vote saved locally! 💾')
      
    } catch (error) {
      console.error('❌ Error saving poll data:', error)
    }
  }, [demoMode, API_KEY, API_URL])

  // Check for updates from other users
  const checkForUpdates = useCallback(async () => {
    try {
      console.log('🔍 Checking for updates...', demoMode ? '(Demo Mode)' : '(Live API)')
      
      if (!demoMode && API_KEY !== 'DEMO_MODE') {
        // Real API check
        const response = await fetch(API_URL, {
          headers: {
            'X-Master-Key': API_KEY,
            'Cache-Control': 'no-cache'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.record && data.record.options) {
            const remoteLastUpdate = new Date(data.record.lastUpdated)
            
            if (remoteLastUpdate > lastSync) {
              console.log('📈 Found newer data from API!')
              setPollData(data.record.options)
              setLastSync(remoteLastUpdate)
              showUpdateNotification('🔄 New votes from other users!')
            }
          }
        }
        return
      }
      
      // Demo mode: simulate occasional updates
      if (Math.random() < 0.2) { // 20% chance
        const randomOption = Math.floor(Math.random() * pollData.length)
        const simulatedVotes = Math.floor(Math.random() * 3) + 1 // 1-3 votes
        
        const newPollData = pollData.map((option, index) =>
          index === randomOption
            ? { ...option, votes: option.votes + simulatedVotes }
            : option
        )
        
        setPollData(newPollData)
        savePollData(newPollData)
        showUpdateNotification(`🎭 Demo: +${simulatedVotes} simulated votes!`)
        console.log(`🎭 Demo: Added ${simulatedVotes} votes to option ${randomOption}`)
      }
      
    } catch (error) {
      console.error('❌ Error checking for updates:', error)
    }
  }, [lastSync, demoMode, API_KEY, API_URL, pollData, savePollData])

  // Show notification
  const showUpdateNotification = useCallback((message: string, type: 'success' | 'warning' = 'success') => {
    if (typeof window === 'undefined') return
    
    const notification = document.createElement('div')
    notification.innerHTML = message
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 1000;
      background: ${type === 'success' ? '#10B981' : '#F59E0B'}; 
      color: white; padding: 12px 20px;
      border-radius: 8px; font-weight: 500; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease; opacity: 1;
      max-width: 300px; font-size: 14px;
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.opacity = '0'
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 4000)
  }, [])

  // Initialize component
  useEffect(() => {
    setIsClient(true)
    
    // Check if we have real API credentials
    if (API_KEY !== 'DEMO_MODE' && BIN_ID !== 'DEMO_MODE') {
      setDemoMode(false)
      console.log('🌍 Real-time polling enabled with live API!')
    } else {
      console.log('🎭 Demo mode enabled. Set NEXT_PUBLIC_JSONBIN_API_KEY and NEXT_PUBLIC_JSONBIN_BIN_ID for live polling.')
    }
    
    // Load initial data
    loadPollData()
    
    // Check existing vote
    const existingVote = localStorage.getItem('tax-poll-vote')
    if (existingVote) {
      setUserVote(existingVote)
    }

    // Set up polling every 30 seconds
    const interval = setInterval(checkForUpdates, 30000)
    
    return () => clearInterval(interval)
  }, [loadPollData, checkForUpdates, API_KEY, BIN_ID])

  const handleVote = useCallback(async (optionId: string) => {
    if (userVote) return

    try {
      console.log('🗳️ Processing vote for:', optionId)
      
      const newPollData = pollData.map(option =>
        option.id === optionId
          ? { ...option, votes: option.votes + 1 }
          : option
      )
      
      // Update UI immediately
      setPollData(newPollData)
      setUserVote(optionId)
      
      if (isClient) {
        localStorage.setItem('tax-poll-vote', optionId)
      }

      // Save globally
      await savePollData(newPollData)

    } catch (error) {
      console.error('❌ Error voting:', error)
    }
  }, [userVote, isClient, pollData, savePollData])

  if (!isClient) {
    return (
      <div className="space-y-6">
        <p className="text-lg font-medium text-center">
          What should be the top priority in tax reform?
        </p>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full p-4 rounded-lg border-2 border-gray-200 bg-gray-50 animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-2 bg-gray-300 rounded mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2">
        <p className="text-lg font-medium text-center">
          What should be the top priority in tax reform?
        </p>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {/* Demo mode indicator */}
      {demoMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <p className="text-yellow-800 text-sm">
            🎭 <strong>Demo Mode:</strong> Simulating real-time updates. 
            <a href="/REAL_TIME_POLLING_SETUP.md" className="underline ml-1">
              Set up live API for global polling
            </a>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {pollData.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes * 100) : 0
          const isUserChoice = userVote === option.id
          
          return (
            <div key={option.id} className="space-y-2">
              <button
                onClick={() => handleVote(option.id)}
                disabled={!!userVote || isLoading}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                  isUserChoice
                    ? 'border-green-500 bg-green-50'
                    : userVote || isLoading
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-70'
                    : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">
                    {index + 1}. {option.text}
                  </span>
                  {isUserChoice && (
                    <span className="text-green-600 text-sm font-medium">
                      ✓ Your choice
                    </span>
                  )}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isUserChoice ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{option.votes} votes</span>
                  <span>{percentage.toFixed(1)}%</span>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      <div className="text-center text-sm text-gray-600">
        <p className="font-medium">Total votes: {totalVotes}</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {demoMode ? '🎭 Demo polling' : '🌍 Global real-time polling'}
        </p>
        <p className="text-xs text-gray-500">
          Updates every 30s • Last sync: {lastSync.toLocaleTimeString()}
        </p>
        {userVote && (
          <p className="mt-2 text-green-600 font-medium">
            Thank you for voting! 🗳️
          </p>
        )}
      </div>
    </div>
  )
}