import { defineConfig } from 'vite';
import { vite as million } from 'million/compiler'; // Importa el plugin de Million
import react from '@vitejs/plugin-react-swc'; // React con SWC
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    million({ auto: true }),
    react(),
    compression({ algorithm: 'brotliCompress' })
  ],
  build: {
    outDir: 'build',         // Directorio de salida
  },
});
