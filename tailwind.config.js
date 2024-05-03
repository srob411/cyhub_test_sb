/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
        fontFamily: {
            'sans': ['RobotoCondensed', 'Arial', 'sans-serif'],
            'heuft': ['Heuft', 'Courier'],
            'heuftmenu': ['HeuftMenu', 'Courier'],
            'mono': ['RobotoMono', 'Consolas', 'monospace']
        },
        colors: {
            'heuft-orange': {
                '50': '#fff8ec',
                '100': '#fff0d3',
                '200': '#ffdca5',
                '300': '#ffc26d',
                '400': '#ff9d32',
                '500': '#ff7f0a',
                '600': '#ff6600',  // Heuft #f60
                '700': '#cc4902',
                '800': '#a1390b',
                '900': '#82310c',
                '950': '#461604'
            },
            'heuft-blue': {
                '50': '#f0faff',
                '100': '#e0f3fe',
                '200': '#b9e9fe',
                '300': '#7cd8fd',
                '400': '#36c6fa',
                '500': '#0cafeb',
                '600': '#009bde',  //  Portal 2 Header Blue
                '700': '#016fa3',
                '800': '#065e86',
                '900': '#0b4e6f',
                '950': '#07324a',
            },
        },
        boxShadow: {
            heuft: '0 5px 10px rgba(23,23,23,.15)'
        }
    },
},
plugins: [
    function({ addVariant }) {
        addVariant('firefox', ':-moz-any(&)')
      }
]
}

