/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // White, Royal Blue, and Green Theme (as requested by user)
        brand: {
          blue: '#008cf0',        // Logo Vibrant Blue
          blueDark: '#006cd4',    // Deep Royal Blue
          blueLight: '#e0f2fe',   // Very Soft Blue Tint
          green: '#10b981',       // Fresh Growth Emerald
          lime: '#8cc800',        // Logo Lime Accent
          greenLight: '#ecfdf5',  // Very Soft Green Tint
          navy: '#0b192f',        // Text Heading Deep Slate
          slate: '#334155',       // Body Text Slate
          border: '#e2e8f0',      // Crisp Border
          surface: '#f8fafc',     // Light Background Surface
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 10px 25px -5px rgba(0, 140, 240, 0.25)',
        'green': '0 10px 25px -5px rgba(16, 185, 129, 0.25)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 35px -5px rgba(0, 140, 240, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
