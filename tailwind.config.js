/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                amber: {
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                },
            },
        },
    },
    plugins: [],
}
