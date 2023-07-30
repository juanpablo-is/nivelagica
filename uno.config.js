import { defineConfig, presetWebFonts, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'h-logo': 'hover:text-accent ease-in duration-150 px-2'
  },
  rules: [
    [
      /^grid-repeat-([\.\d]+)$/,
      ([_, num]) => ({
        'grid-template-columns': `repeat(auto-fit, minmax(${num}px, 1fr))`
      })
    ],
    [
      /^fs-(.*)$/,
      ([_, size]) => ({
        'font-size': size.replace(/_/g, ' ')
      })
    ],
    [
      /^bg-image-\[(.*)\]$/,
      ([_, bimage]) => ({
        'background-image': bimage,
        'background-size': '200% 100%'
      })
    ]
  ],
  theme: {
    colors: {
      accent: '#9146FF'
    },

    animation: {
      keyframes: {
        'background-shine':
          '{from { background-position: 0 0 } to { background-position: -200% 0 }}'
      },
      durations: {
        'background-shine': '2s'
      },
      timingFns: {
        'background-shine': 'linear'
      },
      counts: {
        'background-shine': 'infinite'
      }
    }
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        primary: 'Oswald'
      }
    })
  ]
})
