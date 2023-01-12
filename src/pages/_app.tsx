import { useEffect } from 'react';
import { range } from 'lodash';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { isClient } from 'Util';
import { Theme, useSettings } from 'Store';
import Layout from 'Component/Layout';
import 'Style/Global';

const observerAction: IntersectionObserverCallback = (elements) => {
    elements.forEach(element => {
        if (element.target.getAnimations().length === 0 && element.isIntersecting) {
            element.target.classList.add('begin-animation');
        }
    });
};

const observer = isClient ? new IntersectionObserver(observerAction, {
    root: null,
    rootMargin: '-80px 0px -80px 0px',
    threshold: range(0.01, 1, 0.05)
}) : null;

const elementsToObserve = new Set();

export const updateElementsToObserve = (item: HTMLElement, remove = false) => {
    if (remove) {
        elementsToObserve.delete(item);
        observer?.unobserve(item);
        return;
    }

    elementsToObserve.add(item);
    observer?.observe(item);
};

const beginObservation = () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((element) => updateElementsToObserve(element as HTMLElement));
};

export default function App({ Component, pageProps }: AppProps) {
    const { theme, accentColor, fontSize, contrast } = useSettings();

    useEffect(() => beginObservation());

    useEffect(() => {
        const body = document.querySelector('body')!;
        const html = document.querySelector('html')!;

        body.classList.toggle('theme-light', theme === Theme.LIGHT);
        body.classList.toggle('theme-dark', theme === Theme.DARK);

        if (accentColor) {
            body.style.setProperty('--color-theme', accentColor.value);
        }
        else {
            body.style.removeProperty('--color-theme');
        }

        html.style.fontSize = `${(fontSize || 1)}em`;
        html.style.filter = `contrast(${contrast || 1})`;

    }, [theme, accentColor, fontSize, contrast]);

    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
