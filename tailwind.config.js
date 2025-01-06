/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                custom: {
                    primary: {
                        light: '#F0E7D8',
                        dark: '#171717'
                    },
                    secondary: {
                        light: '#171717',
                        dark: '#F0E7D8'
                    },
                    third: '#A4031F',
                    fourth: '#006DAA'
                }
            },
            fontSize: {
                'xs': ['1.5vh', { lineHeight: '2vh' }],
                'sm': ['2vh', { lineHeight: '2.5vh' }],
                'base': ['2.5vh', { lineHeight: '3vh' }],
                'lg': ['3vh', { lineHeight: '3.5vh' }],
                'xl': ['3.5vh', { lineHeight: '4vh' }],
                '2xl': ['4vh', { lineHeight: '4.5vh' }],
                '3xl': ['4.5vh', { lineHeight: '5vh' }],
                '4xl': ['5vh', { lineHeight: '5.5vh' }],
                '5xl': ['6vh', { lineHeight: '6.5vh' }],
                '6xl': ['7vh', { lineHeight: '7.5vh' }],
            },
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif'],
            },
            keyframes: {
                draw: {
                    '0%': { 
                        'stroke-dashoffset': '100%',
                        opacity: '0'
                    },
                    '20%': { opacity: '1' },
                    '100%': { 
                        'stroke-dashoffset': '0%',
                        opacity: '1'
                    }
                }
            },
            animation: {
                'draw': 'draw 1.5s ease-in-out forwards',
            }
        },
    },
    plugins: [],
}
