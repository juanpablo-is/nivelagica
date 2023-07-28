import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    [
      /^grid-repeat-([\.\d]+)$/,
      ([_, num]) => ({
        'grid-template-columns': `repeat(auto-fit, minmax(${num}px, 1fr))`
      })
    ]
  ],
  theme: {
    colors: {
      light: '#db005c'
    }
  }
})
