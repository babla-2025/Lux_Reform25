'use client'

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell 
} from 'recharts'
import { getBehavioralResponses } from '@/lib/taxCalculations'

export function BehavioralResponseChart() {
  const behavioralData = getBehavioralResponses()
  
  // Data for the bar chart
  const participationData = [
    {
      category: 'Women',
      increase: behavioralData.womenParticipationIncrease,
      color: '#10B981'
    },
    {
      category: 'Working Hours',
      increase: behavioralData.workingHoursIncrease,
      color: '#3B82F6'
    },
    {
      category: 'Men',
      increase: 0.1, // Minimal change
      color: '#6B7280'
    }
  ]

  // Data for economic impact
  const economicImpact = [
    { name: 'Tax Revenue Gain', value: behavioralData.taxRevenueGain, color: '#10B981' },
    { name: 'Current Revenue', value: 100 - behavioralData.taxRevenueGain, color: '#E5E7EB' }
  ]

  return (
    <div className="space-y-8">
      {/* Labor Market Response */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          📈 Labor Market Response to Individual Taxation
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={participationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                fontSize={12}
                tick={{ fill: '#374151' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#374151' }}
                label={{ value: 'Increase (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [`+${value}%`, 'Increase']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="increase" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Findings */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            +{behavioralData.womenParticipationIncrease}%
          </div>
          <p className="text-sm text-green-800">Women's Labor Participation</p>
          <p className="text-xs text-green-700 mt-1">Individual taxation encourages work</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            +{behavioralData.workingHoursIncrease}%
          </div>
          <p className="text-sm text-blue-800">Overall Working Hours</p>
          <p className="text-xs text-blue-700 mt-1">Increased labor supply</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            €{behavioralData.taxRevenueGain}M
          </div>
          <p className="text-sm text-purple-800">Additional Tax Revenue</p>
          <p className="text-xs text-purple-700 mt-1">From increased activity</p>
        </div>
      </div>

      {/* EU-wide Projection */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          🇪🇺 What if we scale this EU-wide?
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Potential Benefits:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Increased women's economic participation across Europe</li>
              <li>• Higher household incomes and living standards</li>
              <li>• Reduced gender inequality in the labor market</li>
              <li>• Significant boost to EU economic growth</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Implementation Considerations:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Different tax systems across EU countries</li>
              <li>• Transition costs and administrative changes</li>
              <li>• Social security coordination needed</li>
              <li>• Political consensus building required</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Research Note */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Research Methodology:</strong> These behavioral responses are based on microsimulation 
          analysis using Luxembourg tax and household data. The model accounts for labor supply elasticity, 
          household decision-making, and economic incentives under different taxation regimes.
        </p>
      </div>
    </div>
  )
}
