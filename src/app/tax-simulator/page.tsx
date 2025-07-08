'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { TaxCalculator } from '@/components/TaxCalculator'
import { BehavioralResponseChart } from '@/components/BehavioralResponseChart'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

// Component that uses useSearchParams - must be wrapped in Suspense
function TaxSimulatorContent() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  
  // Get initial values from URL parameters
  const initialIncome1 = searchParams.get('income1') ? parseInt(searchParams.get('income1')!) : 70000
  const initialIncome2 = searchParams.get('income2') ? parseInt(searchParams.get('income2')!) : 20000
  const initialType = searchParams.get('type') as 'joint' | 'individual' | null

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Luxembourg Tax Simulator
              </h1>
              <p className="text-gray-600 mt-1">
                Compare Joint vs Individual Taxation
              </p>
            </div>
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tax Calculator */}
          <div className="space-y-6">
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                🧮 Tax Calculator
              </h2>
              <TaxCalculator 
                initialIncome1={initialIncome1}
                initialIncome2={initialIncome2}
                initialType={initialType}
              />
            </section>
          </div>

          {/* Behavioral Responses */}
          <div className="space-y-6">
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                📊 Behavioral Response Analysis
              </h2>
              <BehavioralResponseChart />
            </section>
            
            {/* Additional Info */}
            <section className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                💡 What This Means
              </h3>
              <div className="space-y-3 text-blue-800">
                <p className="text-sm">
                  <strong>Individual Taxation Benefits:</strong> 
                  Encourages both spouses to work, especially beneficial for women's labor market participation.
                </p>
                <p className="text-sm">
                  <strong>Joint Taxation Benefits:</strong> 
                  Often provides immediate tax savings for couples with income disparities.
                </p>
                <p className="text-sm">
                  <strong>Economic Impact:</strong> 
                  Individual taxation could generate significant economic benefits through increased labor participation.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Want to Learn More?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This simulation is based on research by the Luxembourg Institute of Socio-Economic Research (LISER). 
              The behavioral responses shown are derived from microsimulation analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="btn-primary"
              >
                Return to Main Demo
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Try Different Scenario
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Main component with Suspense wrapper
export default function TaxSimulator() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TaxSimulatorContent />
    </Suspense>
  )
}