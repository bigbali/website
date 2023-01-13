import { useEffect } from 'react';
import { range } from 'lodash';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { isClient, ScrollAnimationObserver } from 'Util';
import { Theme, useSettings } from 'Store';
import Layout from 'Component/Layout';
import 'Style/Global';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => ScrollAnimationObserver?.observe('.animate-on-scroll'));

    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
