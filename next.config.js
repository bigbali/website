const { patchWebpackConfig } = require('next-global-css');

const REPLACE_MODULE_WITH_STYLE = 'Component.module.css';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    sassOptions: {
        additionalData: '@import "src/style/mixin.scss";'
    },
    webpack: (config, options) => {
        config.resolve.extensions.push('.scss');
        patchWebpackConfig(config, options);

        // config.module.rules.forEach((rule) => {
        //     if (!rule.test) return;

        //     console.log(rule.test)

        // })
        return config;
    }
}

module.exports = nextConfig;
