import { defineConfig, presetWebFonts, presetUno } from 'unocss'

export default defineConfig({
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
      light: '#db005c'
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
