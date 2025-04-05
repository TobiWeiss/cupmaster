/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                slideIn: "slideIn .25s ease-in-out forwards 1s"
            },
            colors: {
                custom: {
                    primary: {
                        light: '#FFFFFF',
                        dark: '#545154'
                    },
                    secondary: {
                        light: '#545154',
                        dark: '#F0E9E9'
                    },
                    third: '#A4031F',
                    fourth: '#006DAA'
                }
            },
            spacing: {
                '128': '28rem',
                '129': '29rem',
                '130': '30rem',
                '131': '31rem',
                '132': '32rem',
                '133': '33rem',
                '134': '34rem',
                '135': '35rem',
                '136': '36rem',
                '137': '37rem',
                '138': '38rem',
                '139': '39rem',
                '140': '40rem',
            },
            fontSize: {
                'xs': ['1.75vh', { lineHeight: '2vh' }],
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
                slideIn: {
                    "0%": { opacity: 0, transform: "translateX(100%)" },
                    "100%": { opacity: 1, transform: "translateX(0)" }
                },
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
