import { patchWebpackConfig } from 'next-global-css';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

/**
 * @type {import('next').NextConfig}
 */
export default {
    sassOptions: {
        additionalData: (content) => {
            // put something in here and all .scss files will have it
            const importAutomatically = [
                '@import "src/style/mixin.scss";',
                '@import "src/style/function.scss";'
            ];

            return importAutomatically.join('').concat(content);
        }
    },
    webpack: (config, options) => {
        config.resolve.extensions.push('.scss');
        patchWebpackConfig(config, options);

        /* eslint-disable no-undef */
        if (process.env.ANALYZE) {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: !options.nextRuntime
                        ? './analyze/client.html'
                        : `../${
                            options.nextRuntime === 'nodejs' ? '../' : ''
                        }analyze/${options.nextRuntime}.html`
                })
            );
        }

        return config;
    }
};
