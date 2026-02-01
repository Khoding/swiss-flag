import {defineConfig} from 'vite';
import {resolve, dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'swiss-flag.js'),
      name: 'SwissFlag',
      fileName: format => `swiss-flag.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
