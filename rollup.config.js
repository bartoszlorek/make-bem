import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

const ENTRY = 'src/index.js'
const UMD_NAME = 'makeBem'
const FILENAME = 'make-bem'
const EXTERNAL = []

const uglifyConfig = {
    compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        reduce_funcs: false
    },
    mangle: {
        toplevel: true
    }
}

const babelConfig = {
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['env', { modules: false }]],
    plugins: ['external-helpers']
}

const makeUglify = output => ({
    entry: ENTRY,
    output,
    plugins: [
        resolve(),
        commonjs(),
        uglify(uglifyConfig),
        babel(babelConfig)
    ],
    external: EXTERNAL,
    watch: { include: 'src/**' }
})

const makeBeautify = output => ({
    entry: ENTRY,
    output,
    plugins: [
        resolve(),
        commonjs(),
        babel(babelConfig)
    ],
    external: EXTERNAL,
    watch: { include: 'src/**' }
})

const configs = (function() {
    if (process.env.DEVELOPMENT) {
        return [
            makeBeautify({
                file: `./dist/${FILENAME}.umd.js`,
                format: 'umd',
                name: UMD_NAME
            })
        ]
    } else {
        return [
            makeBeautify({
                file: `./dist/${FILENAME}.js`,
                format: 'cjs'
            }),
            makeUglify({
                file: `./dist/${FILENAME}.min.js`,
                format: 'cjs'
            }),
            makeUglify({
                file: `./dist/${FILENAME}.umd.js`,
                format: 'umd',
                name: UMD_NAME
            })
        ]
    }
})()

export default configs
