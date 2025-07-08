'use client'

import { useState, useEffect } from 'react'
import { 
  compareTaxationMethods, 
  formatCurrency, 
  formatPercentage,
  type ComparisonResult 
} from '@/lib/taxCalculations'

interface TaxCalculatorProps {
  initialIncome1?: number
  initialIncome2?: number
  initialType?: 'joint' | 'individual' | null
}

export function TaxCalculator({ 
  initialIncome1 = 70000, 
  initialIncome2 = 20000,
  initialType = null 
}: TaxCalculatorProps) {
  const [income1, setIncome1] = useState(initialIncome1)
  const [income2, setIncome2] = useState(initialIncome2)
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Calculate whenever inputs change
  useEffect(() => {
    if (income1 >= 0 && income2 >= 0) {
      setIsCalculating(true)
      // Add small delay for better UX
      const timer = setTimeout(() => {
        const calculation = compareTaxationMethods(income1, income2)
        setResult(calculation)
        setIsCalculating(false)
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [income1, income2])

  const handleIncomeChange = (field: 'income1' | 'income2', value: string) => {
    const numValue = parseInt(value) || 0
    if (field === 'income1') {
      setIncome1(Math.max(0, numValue))
    } else {
      setIncome2(Math.max(0, numValue))
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Household Income</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner 1 Annual Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
              <input
                type="number"
                value={income1}
                onChange={(e) => handleIncomeChange('income1', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="70000"
                min="0"
                max="500000"
                step="1000"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner 2 Annual Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
              <input
                type="number"
                value={income2}
                onChange={(e) => handleIncomeChange('income2', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="20000"
                min="0"
                max="500000"
                step="1000"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Total Household Income:</strong> {formatCurrency(income1 + income2)}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isCalculating && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Calculating...</span>
        </div>
      )}

      {/* Results Section */}
      {result && !isCalculating && (
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-800">Tax Comparison Results</h3>
          
          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Joint Taxation */}
            <div className={`p-6 rounded-lg border-2 ${
              result.recommendation === 'joint' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Joint Taxation</h4>
                {result.recommendation === 'joint' && (
                  <span className="text-green-600 text-sm font-medium">
                    ✅ Recommended
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Income:</span>
                  <span className="font-medium">{formatCurrency(result.jointTaxation.grossIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Income Tax:</span>
                  <span>{formatCurrency(result.jointTaxation.incomeTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Solidarity Tax:</span>
                  <span>{formatCurrency(result.jointTaxation.solidarityTax)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total Tax:</span>
                  <span className="font-bold">{formatCurrency(result.jointTaxation.totalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Net Income:</span>
                  <span className="font-bold text-green-600">{formatCurrency(result.jointTaxation.netIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Effective Rate:</span>
                  <span>{formatPercentage(result.jointTaxation.effectiveRate)}</span>
                </div>
              </div>
            </div>

            {/* Individual Taxation */}
            <div className={`p-6 rounded-lg border-2 ${
              result.recommendation === 'individual' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Individual Taxation</h4>
                {result.recommendation === 'individual' && (
                  <span className="text-green-600 text-sm font-medium">
                    ✅ Recommended
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Income:</span>
                  <span className="font-medium">{formatCurrency(result.individualTaxation.grossIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Income Tax:</span>
                  <span>{formatCurrency(result.individualTaxation.incomeTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Solidarity Tax:</span>
                  <span>{formatCurrency(result.individualTaxation.solidarityTax)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total Tax:</span>
                  <span className="font-bold">{formatCurrency(result.individualTaxation.totalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Net Income:</span>
                  <span className="font-bold text-green-600">{formatCurrency(result.individualTaxation.netIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Effective Rate:</span>
                  <span>{formatPercentage(result.individualTaxation.effectiveRate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">💰 Summary</h4>
            <div className="space-y-2 text-blue-800">
              <p>
                <strong>{result.recommendation === 'joint' ? 'Joint' : 'Individual'} taxation</strong> is 
                better for this scenario, saving you <strong>{formatCurrency(result.savings)}</strong> annually.
              </p>
              {result.savings > 0 && (
                <p className="text-sm">
                  That's approximately <strong>{formatCurrency(result.savings / 12)}</strong> per month in savings!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
