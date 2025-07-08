import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Test - Luxembourg Tax Simulator',
  description: 'Test page to verify QR code functionality',
}

export default function QRTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            QR Code Works!
          </h1>
          <p className="text-gray-600">
            You have successfully scanned the QR code and reached the Luxembourg Tax Simulator.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold text-blue-900 mb-2">🇱🇺 Luxembourg Tax Simulator</h2>
          <p className="text-sm text-blue-800">
            Compare joint vs individual taxation scenarios for Luxembourg couples.
          </p>
        </div>

        <div className="space-y-3">
          <a 
            href="/tax-simulator" 
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Tax Simulation
          </a>
          
          <a 
            href="/" 
            className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </a>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>Research by Luxembourg Institute of Socio-Economic Research (LISER)</p>
        </div>
      </div>
    </div>
  )
}
