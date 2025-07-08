# Luxembourg Tax Simulator

An interactive web application for comparing joint vs individual taxation in Luxembourg, based on research by the Luxembourg Institute of Socio-Economic Research (LISER).

## 🎯 Features

- **QR Code Access**: Generate QR codes for different tax scenarios
- **Interactive Tax Calculator**: Compare joint vs individual taxation
- **Real-time Polling**: Visitor polls with live updates every 30 seconds
- **Behavioral Response Analysis**: Visualization of research data
- **Mobile-Responsive**: Optimized for mobile and tablet devices
- **Luxembourg 2025 Tax Rules**: Accurate tax calculations using current brackets

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
luxembourg-tax-simulator/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   └── tax-simulator/   # Tax simulator page
│   ├── components/          # React components
│   │   ├── QRCodeDisplay.tsx
│   │   ├── PollResults.tsx
│   │   ├── TaxCalculator.tsx
│   │   └── BehavioralResponseChart.tsx
│   └── lib/
│       └── taxCalculations.ts # Luxembourg tax logic
├── public/                  # Static assets
├── package.json
└── README.md
```

## 💰 Tax Calculation Details

The app implements Luxembourg's 2025 tax system:

- **Progressive tax brackets**: 8% to 42%
- **Solidarity tax**: 7% (9% for high earners)
- **Joint vs Individual taxation options**
- **Behavioral response modeling**

## 📊 Research Data

Based on microsimulation research showing:
- Women's labor participation: +2.58%
- Working hours increase: +2.27%
- Tax revenue gain: €9.77 million

## 🔧 Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **QR Codes**: react-qr-code, @yudiel/react-qr-scanner
- **Deployment**: Vercel-ready

## 📱 Usage

1. **Home Page**: View project overview and scan QR codes
2. **Tax Simulator**: Enter income data and compare taxation methods
3. **Polling**: Vote on tax reform priorities
4. **Analysis**: View behavioral response projections

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## 📄 License

Research project by Luxembourg Institute of Socio-Economic Research (LISER).

## 🤝 Contributing

This is a research demonstration project. For questions about the underlying research, contact LISER.

---

**Built with ❤️ for Luxembourg tax policy research**
