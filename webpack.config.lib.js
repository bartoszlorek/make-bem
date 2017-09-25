var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './',
        filename: './dist/make-bem.min.js',
        library: 'makeBem',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}