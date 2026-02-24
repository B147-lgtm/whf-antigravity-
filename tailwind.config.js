/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'editorial': ['"Cormorant Garamond"', 'serif'],
                'sans': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
