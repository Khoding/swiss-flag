import {defineConfig} from 'vite';
import {resolve, dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({command}) => {
  if (command === 'serve') {
    return {
      root: 'demo',
      css: {
        transformer: 'lightningcss'
      },
      resolve: {
        alias: {
          '/src': resolve(__dirname, 'src')
        }
      },
      server: {
        port: 3000
      }
    };
  }

  return {
    css: {
      transformer: 'lightningcss'
    },
    publicDir: false,
    server: {
      port: 3000
    },
    build: {
      cssMinify: 'lightningcss',
      lib: {
        entry: resolve(__dirname, 'src/swiss-flag.js'),
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
  };
});
