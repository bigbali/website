import { useEffect, useRef } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { type AppProps } from 'next/app';
import { useSettings } from '@store';
import { ScrollAnimationObserver } from '@util';
import { applySettings } from '@util/settings';
import Layout from '@component/layout';
import Transition from '@component/transition';
import '@style/main';

export default function App({ Component, pageProps, router }: AppProps) {
    const pageWrapperRef = useRef<HTMLElement>(null);
    const theme = useSettings((state) => state.theme);
    const accentColor = useSettings((state) => state.accentColor);
    const fontSize = useSettings((state) => state.fontSize);
    const contrast = useSettings((state) => state.contrast);

    useEffect(() => {
        // When mounted, set style of body and change CSS variables
        applySettings({
            theme,
            accentColor,
            fontSize,
            contrast
        });
    }, [theme, accentColor, fontSize, contrast]);

    useEffect(() => {
        // On every new page, gather all .animate-on-scroll elements and observe them
        // and before a new page is rendered, clear them all
        ScrollAnimationObserver?.observe('.animate-on-scroll');
        return () => ScrollAnimationObserver?.disconnect();
    }, [router.asPath]);

    useEffect(() => { // after transition on initial load is skipped, allow the rest of the animations
        const timeout = setTimeout(() => document.querySelector('body')?.classList?.remove('no-animation'), 200);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Layout ref={pageWrapperRef}>
            {/*
                SwitchTransition causes elements to not be in the DOM when the querySelector runs,
                and since the exit prop doesn't work properly and therefore is turned off, we can just use TransitionGroup.
            */}
            <TransitionGroup component={null}>
                <Transition
                    //@ts-ignore (it's expecting RefObject<undefined>, which clearly isn't sensible)
                    nodeRef={pageWrapperRef}
                    key={router.asPath}
                    classNames='cross-page'
                    exit={false}
                    in={false}
                    enter={router.asPath !== '/'}
                    timeout={{
                        enter: 300
                    }}
                >
                    <Component {...pageProps} />
                </Transition>
            </TransitionGroup>
        </Layout>
    );
}
