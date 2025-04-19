import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // Bind the server to all network interfaces
    port: process.env.PORT || 5173, // Use the PORT environment variable provided by Render or fallback to 5173
  },
})
