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

  // Calculate total votes whenever pollData changes
  const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0)

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true)
    // Check if user has already voted
    const existingVote = localStorage.getItem('tax-poll-vote')
    if (existingVote) {
      setUserVote(existingVote)
    }
  }, [])

  const handleVote = useCallback(async (optionId: string) => {
    if (userVote) {
      console.log('User has already voted')
      return // Already voted
    }

    try {
      console.log('Processing vote for:', optionId)
      
      // Update poll data immediately
      setPollData(prevData => {
        const newData = prevData.map(option =>
          option.id === optionId
            ? { ...option, votes: option.votes + 1 }
            : option
        )
        console.log('Updated poll data:', newData)
        return newData
      })
      
      // Set user vote
      setUserVote(optionId)
      console.log('Set user vote to:', optionId)

      // Store vote in localStorage
      if (isClient) {
        localStorage.setItem('tax-poll-vote', optionId)
        console.log('Saved vote to localStorage')
      }

    } catch (error) {
      console.error('Error voting:', error)
    }
  }, [userVote, isClient])

  // Don't render until client-side
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
      <p className="text-lg font-medium text-center">
        What should be the top priority in tax reform?
      </p>

      <div className="space-y-4">
        {pollData.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes * 100) : 0
          const isUserChoice = userVote === option.id
          
          return (
            <div key={option.id} className="space-y-2">
              <button
                onClick={() => handleVote(option.id)}
                disabled={!!userVote}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  isUserChoice
                    ? 'border-green-500 bg-green-50'
                    : userVote
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
                
                {/* Progress bar */}
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
        <p>Total votes: {totalVotes}</p>
        <p className="mt-1">Live polling system</p>
        {userVote && (
          <p className="mt-2 text-green-600 font-medium">
            Thank you for voting! 🗳️
          </p>
        )}
      </div>
    </div>
  )
}