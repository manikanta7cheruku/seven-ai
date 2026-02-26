// This is the Vite build tool configuration.
// We add the Tailwind CSS plugin here so Tailwind processes our styles.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Processes all Tailwind utility classes
  ],
})