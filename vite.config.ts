import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace with your GitHub repo name
const repoName = 'themeEcommerce'

export default defineConfig({
  plugins: [react()],
base: "/"
})
