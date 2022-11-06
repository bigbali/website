import { Application as SplineApplication } from '@splinetool/runtime';
import { memo, RefObject, useEffect, useRef, lazy } from 'react';
import { Theme } from 'Store';
import { useSettings } from 'Util';
import FontFaceObserver from 'fontfaceobserver';
import './Landing.style.scss';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineURL = {
    Light: 'https://prod.spline.design/QtRgBHPKynDO4AfI/scene.splinecode',
    Dark: 'https://prod.spline.design/XmIopwGYaPfZKReY/scene.splinecode',
    LightV2: 'https://prod.spline.design/oE1PXrOYS773cHVg/scene.splinecode'
};

const fontsReady = async () => {
    const raleway = new FontFaceObserver('Raleway');
    const caveat = new FontFaceObserver('Caveat');
    let error = false;

    await raleway.load().catch(() => {
        console.warn('Failed to load font: Raleway.');
        error = true;
    });
    await caveat.load().catch(() => {
        console.warn('Failed to load font: Caveat.');
        error = true;
    });

    return !error;
};

const Landing = memo(({ onReady, loadingRef }: { onReady: () => void, loadingRef: RefObject<HTMLDivElement> }) => {
    const [{ theme }] = useSettings();
    const spline = useRef<SplineApplication>();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;

        const effect = async () => {
            await fontsReady();

            // Wait till we have the fonts loaded so we don't see the font flicker
            loadingRef.current && loadingRef.current.classList.add('IndexPage-Loading_FONTS_READY');

            timeoutId = setTimeout(() => {
                // triggerAnimation();
                onReady();
            }, 1000);
        };

        void effect();

        return () => clearTimeout(timeoutId);
    }, [theme]);

    const onLoad = (splineApp: SplineApplication) => {
        spline.current = splineApp;
    };

    const triggerAnimation = () => {
        spline.current?.emitEvent('mouseHover', 'All');
    };

    return (
        <section id='Landing' block='Landing'>
            <div elem='Content'>
                <h1>
                    Hey, my name is
                    <br />
                    <span>
                        Balázs
                        <span className='accent'>
                            .
                        </span>
                    </span>
                </h1>
                <h2>
                    I'm a
                    <span>
                        &nbsp;software developer
                        <span className='accent'>
                            .
                        </span>
                    </span>
                </h2>
                <h3>
                    <span>
                        I craft applications with beautiful user interfaces and user experience in mind,
                        for both the web and desktop platforms
                    </span>
                    <span className='accent'>
                        .
                    </span>
                </h3>
            </div>
            <div elem='Spline'>
                <Spline
                    onLoad={onLoad}
                    scene={
                        theme === Theme.LIGHT
                            ? SplineURL.LightV2
                            : SplineURL.Dark
                    }
                />
            </div>
        </section>
    );
});

export default Landing;