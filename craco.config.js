const path = require('path');
const webpack = require('webpack');

module.exports = {
    style: {
        sass: {
            loaderOptions: { // Make sure we can use mixins without needing to import
                additionalData: '@import "src/style/mixin.scss";'
            },
        },
    },
    webpack: {
        alias: {
            'Component': path.resolve(__dirname, 'src/component'),
            'Route': path.resolve(__dirname, 'src/route'),
            'Store': path.resolve(__dirname, 'src/store'),
            'Util': path.resolve(__dirname, 'src/util'),
            'Style': path.resolve(__dirname, 'src/style'),
            'Type': path.resolve(__dirname, 'src/type')
        },
        configure: webpackConfig => { // Remove the need for '.scss' when importing styles
            webpackConfig.resolve.extensions.push('.scss');
            return webpackConfig;
        }
    },
    babel: { // babel-loader configuration
        loaderOptions: (options) => {
            return {
                ...options,
                babelrc: true,
            };
        },
    }
};