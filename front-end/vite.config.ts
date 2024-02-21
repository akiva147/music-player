import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import ConditionalCompile from 'vite-plugin-conditional-compiler'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), ConditionalCompile()],
    server: {
        port: 3000,
        strictPort: true,
        host: 'localhost',
    },
    build: {
        target: 'esnext',
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext',
        },
    },
})
