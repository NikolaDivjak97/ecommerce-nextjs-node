export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ Scan all Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Scan all components
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ (if using App Router)
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
