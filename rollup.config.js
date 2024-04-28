import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import strip from '@rollup/plugin-strip'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const isProduction = process.env.NODE_ENV === 'production'

console.log('isProduction', isProduction)

const name = 'v_core_timers'

const srcDir = 'source'
const srcIndex = 'index'
const outDir = 'dist'
const formats = ['iife', 'cjs', 'es']
const treeshake = 'smallest'

const banner = `//! 📚 Package: ${name} \n//! 👨‍💻 Author: V-core9`
const footer = `//! - - - - -<[:-v-:]>- - - - - `

const pthRes = (pth) => path.resolve(__dirname, pth)

const distPath = (format) => `./${outDir}/${name}.${format}.js`

const buildConfig = {
  input: pthRes(`./${srcDir}/${srcIndex}.js`),
  treeshake,
  output: [
    // 3 Versions output
    ...formats.map((format) => ({
      file: distPath(format),
      name,
      banner,
      footer,
      format,
      sourcemap: true,
      minifyInternalExports: true,
      sanitizeFileName: true,
      generatedCode: {
        arrowFunctions: true,
        constBindings: true,
        conciseMethodProperty: true,
        objectShorthand: true,
        parameterDestructuring: true,
        reservedNamesAsProps: true,
        stickyRegExp: true,
        templateString: true
      }
      // experimentalMinChunkSize: 1000
    }))
  ],
  plugins: [
    resolve(),
    commonjs(),
    nodePolyfills(/* options */),
    ...(isProduction
      ? [
          terser({
            maxWorkers: 4,
            compress: {
              // booleans_as_integers: true,
              ecma: 2015
            }
          }),
          strip({
            //labels: ['unittest'],
            debugger: true
          })
        ]
      : [])
    // babel({
    //   exclude: 'node_modules/**'
    // })
  ]
}

export default buildConfig
