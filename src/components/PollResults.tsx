'use client'

import { useState, useEffect } from 'react'

interface PollOption {
  id: string
  text: string
  votes: number
}

export function PollResults() {
  const [pollData, setPollData] = useState<PollOption[]>([
    { id: 'fairness', text: 'Fairness across households', votes: 45 },
    { id: 'women-incentives', text: 'Incentives for working women', votes: 32 },
    { id: 'budget-neutral', text: 'Budget neutrality', votes: 28 },
    { id: 'simplification', text: 'Simplification of the tax code', votes: 18 },
  ])

  const [userVote, setUserVote] = useState<string | null>(null)
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    // Calculate total votes
    const total = pollData.reduce((sum, option) => sum + option.votes, 0)
    setTotalVotes(total)

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setPollData(prevData => 
        prevData.map(option => ({
          ...option,
          votes: option.votes + Math.floor(Math.random() * 3) // Add 0-2 random votes
        }))
      )
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [pollData])

  const handleVote = async (optionId: string) => {
    if (userVote) return // Already voted

    try {
      // In a real app, this would be an API call
      // await fetch('/api/poll-vote', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ optionId }) 
      // })

      // Update local state
      setPollData(prevData =>
        prevData.map(option =>
          option.id === optionId
            ? { ...option, votes: option.votes + 1 }
            : option
        )
      )
      setUserVote(optionId)

      // Store vote in localStorage to prevent multiple votes
      localStorage.setItem('tax-poll-vote', optionId)
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  useEffect(() => {
    // Check if user has already voted
    const existingVote = localStorage.getItem('tax-poll-vote')
    if (existingVote) {
      setUserVote(existingVote)
    }
  }, [])

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
        <p className="mt-1">Results update every 30 seconds</p>
        {userVote && (
          <p className="mt-2 text-green-600 font-medium">
            Thank you for voting! 🗳️
          </p>
        )}
      </div>
    </div>
  )
}
