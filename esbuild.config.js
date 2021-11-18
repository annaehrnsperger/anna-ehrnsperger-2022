const { build } = require('esbuild');
const { glsl } = require('esbuild-plugin-glsl');

build({
  entryPoints: ['./src/scripts/main.js'],
  outfile: 'public/main.js',
  bundle: true,
  watch: process.env.NODE_ENV !== 'production',
  minify: process.env.NODE_ENV === 'production',
  plugins: [
    glsl({
      minify: true,
    }),
  ],
}).catch(() => process.exit(1));

// "watch:js": "esbuild ./src/scripts/main.js --outfile=public/main.js --bundle --watch",
// "build:js": "esbuild ./src/scripts/main.js --outfile=public/main.js --bundle --minify",
