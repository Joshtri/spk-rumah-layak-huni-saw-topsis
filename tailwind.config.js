/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js,jsx,tsx", // Add this line to include flowbite paths
  ],
  theme: {
    extend: {},
  },
  plugins: [
    import("flowbite/plugin"), // Use 'flowbite/plugin' instead of flowbite.plugin()
  ],
};
