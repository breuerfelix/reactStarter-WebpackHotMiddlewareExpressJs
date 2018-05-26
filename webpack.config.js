var webpack = require('webpack');
var path = require('path');
var dev = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: dev ? 'development' : 'production',

    devtool: dev ? 'inline-source-map' : 'none',
    context: __dirname,
    entry: dev
        ? [
            'webpack-hot-middleware/client',
            path.resolve(__dirname, 'client/index.js')
        ]
        : [path.resolve(__dirname, 'client/index.js')],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                include: [path.resolve(__dirname, 'client')]
            }
        ]
    },
    performance: { hints: false },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: dev
        ? [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
        : []
};
