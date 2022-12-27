const REPLACE_MODULE_WITH_STYLE = 'Component.module.css';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    sassOptions: {
        additionalData: '@import "src/style/mixin.scss";'
    },
    webpack: (config) => {
        config.resolve.extensions.push('.scss');
        return config;
    }
}

module.exports = nextConfig;
