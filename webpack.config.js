let path = require('path');
let TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        'index': './src/js/script.js',
        'index.min': './src/js/script.js',
        'cart': './src/js/cart.js',
        'cart.min': './src/js/cart.js',
        'main': './src/js/main.js',
        'main.min': './src/js/main.js'
    },
     optimization: {
         minimize: true,
         minimizer: [
             new TerserPlugin({
                 include: /\.min\.js$/
             })
         ]
     },
    output: {
        path: path.resolve('./assets/js'),
        filename: '[name].js'
    }
};