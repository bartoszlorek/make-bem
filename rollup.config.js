import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

const babelConfig = {
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['env', { modules: false }]],
    plugins: ['external-helpers']
}

export default [
    {
        entry: 'src/index.js',
        output: {
            file: './dist/make-bem.js',
            format: 'cjs'
        },
        plugins: [
            resolve(),
            commonjs(),
            babel(babelConfig)
        ]
    },
    {
        entry: 'src/index.js',
        output: {
            file: './dist/make-bem.min.js',
            format: 'cjs'
        },
        plugins: [
            resolve(),
            commonjs(),
            uglify({
                compress: {
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    reduce_funcs: false
                },
                mangle: {
                    toplevel: true
                }
            }),
            babel(babelConfig)
        ]
    }
]
