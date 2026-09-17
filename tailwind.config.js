/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Token names kept stable so components don't need renaming everywhere;
        // values remapped to match the reference SanskritiX theme (cream / orange / teal).
        ink: '#1E2438',
        inksoft: '#4A5169',
        muted: '#6B7185',
        sandstone: '#F4EFE3', // cream
        cream2: '#EFE8D8',
        marigold: '#DD7A34', // orange accent
        marigolddark: '#C2621F',
        madder: '#1F6E5E', // teal primary
        madderdark: '#154F44',
        tealtint: '#E4EEE9',
        indigo: '#154F44', // teal-dark, used for dark sections/footer/video bg
        stoneline: '#E2DBC8',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
