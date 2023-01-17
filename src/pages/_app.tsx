import { useEffect, useRef } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { type AppProps } from 'next/app';
import { ScrollAnimationObserver } from 'Util';
import Layout from 'Component/Layout';
import Transition from 'Component/Transition';
import 'Style/Global';

export default function App({ Component, pageProps, router }: AppProps) {
    const pageWrapperRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // On every new page, gather all .animate-on-scroll elements and observe them
        // and before a new page is rendered, clear them all
        ScrollAnimationObserver?.observe('.animate-on-scroll');
        return () => ScrollAnimationObserver?.disconnect();
    }, [router.asPath]);

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
                    classNames="cross-page"
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
