import { type AppProps } from 'next/app';
import Head from 'next/head';
import Layout from 'Component/Layout';
import 'Style/Global';
import { isClient, scrollIntoView } from 'Util';
import { useEffect } from 'react';

const observerAction: IntersectionObserverCallback = (elements) => {
    elements.forEach(element => {
        !element.target.getAnimations().length && element.target.classList.toggle('begin-animation', element.isIntersecting);
    });
};

const observer = isClient ? new IntersectionObserver(observerAction, {
    root: null,
    rootMargin: '-80px 0px -80px 0px',
    threshold: [0.01, 0.99]
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

const afterTransitionCallback = (sectionId: string | null) => {
    if (!sectionId) return;

    beginObservation();

    const section = document.querySelector(sectionId) as HTMLElement;
    section && scrollIntoView({ current: section });
};


export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => beginObservation());

    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
