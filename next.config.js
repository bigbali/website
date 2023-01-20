const { patchWebpackConfig } = require('next-global-css');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    sassOptions: {
        additionalData: (content) => {
            // put something in here and all .scss files will have it
            const importAutomatically = [
                '@import "src/style/mixin.scss";',
                '@import "src/style/function.scss";',
            ];

            return importAutomatically.join('').concat(content);
        }
    },
    webpack: (config, options) => {
        config.resolve.extensions.push('.scss');
        patchWebpackConfig(config, options);

        return config;
    }
}

module.exports = nextConfig;
