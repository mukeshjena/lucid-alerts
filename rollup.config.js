import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default [
  // ES Module build
  {
    input: 'src/lucid-alerts.js',
    output: {
      file: 'dist/lucid-alerts.esm.js',
      format: 'es'
    },
    plugins: [
      postcss({
        inject: true,
        minimize: true
      })
    ]
  },
  // UMD build for CDN usage
  {
    input: 'src/lucid-alerts.js',
    output: {
      file: 'dist/lucid-alerts.js',
      format: 'umd',
      name: 'LucidAlerts',
      globals: {}
    },
    plugins: [
      postcss({
        inject: true,
        minimize: false
      })
    ]
  },
  // Minified UMD build for CDN
  {
    input: 'src/lucid-alerts.js',
    output: {
      file: 'dist/lucid-alerts.min.js',
      format: 'umd',
      name: 'LucidAlerts',
      globals: {}
    },
    plugins: [
      postcss({
        inject: true,
        minimize: true
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        mangle: true
      })
    ]
  }
];