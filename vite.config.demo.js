import {defineConfig} from 'vite';
import {resolve, dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'demo',
  css: {
    transformer: 'lightningcss'
  },
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
    cssMinify: 'lightningcss'
  }
});
