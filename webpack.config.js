var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
        devtool: 'source-map',
        entry: {
            main: './src/main.ts'
        },
        output: {
            filename: '[name].js',
            path: './dist'
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            }
        ]
    },

    plugins: [
        new CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        })
    ]
};

