import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT || 5173, // Use the PORT environment variable or default to 5173
    allowedHosts: ['fdproject-2.onrender.com'], // Allow this host (Render domain)
  },
})
