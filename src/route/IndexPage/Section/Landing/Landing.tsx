import {
    memo,
    RefObject,
    useEffect,
    useRef,
    lazy
} from 'react';
import { Application as SplineApplication } from '@splinetool/runtime';
import { fromEvent, throttleTime } from 'rxjs';
import FontFaceObserver from 'fontfaceobserver';
import { Theme } from 'Store';
import { useSettings } from 'Util';
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

    await raleway.load().catch(() => {
        console.warn('Font load timed out: Raleway.');
    });
    await caveat.load().catch(() => {
        console.warn('Font load timed out: Caveat.');
    });
};

const Landing = memo(({ onReady, loadingRef }: { onReady: () => void, loadingRef: RefObject<HTMLDivElement> }) => {
    const [{ theme }] = useSettings();
    const spline = useRef<SplineApplication>();
    const splineCanvas = useRef<HTMLCanvasElement>();
    const landingContentRef = useRef<HTMLDivElement>(null);

    const onLoad = (splineApp: SplineApplication) => {
        spline.current = splineApp;
        splineCanvas.current = document.querySelector('.Landing-Spline canvas') as HTMLCanvasElement;
    };

    const triggerAnimation = () => {
        spline.current?.emitEvent('mouseHover', 'All');
    };

    function translateCanvas(e: MouseEvent) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const x = (e.clientX - windowWidth / 2) / 100 * -1;
        const y = (e.clientY - windowHeight / 2) / 100 * -1;
        splineCanvas.current!.style.translate = `${x}px ${y}px`;
    }

    useEffect(() => {
        const timeoutId: { // let's remember the timeout so we can clean it up like a proper gentleman
            value: NodeJS.Timeout | undefined
        } = {
            value: undefined
        };

        const effect = async () => {
            await fontsReady();

            // Wait till we have the fonts loaded so we don't see the font flicker
            loadingRef.current && loadingRef.current.classList.add('IndexPage-Loading_FONTS_READY');

            timeoutId.value = setTimeout(() => {
                landingContentRef.current && landingContentRef.current.classList.add('Landing-Content_BEGIN_ANIMATION');

                // as this runs after page load, tell TypeScript that the elements are definitely there
                fromEvent([landingContentRef.current!.parentElement!, document.querySelector('.Header')!], 'mousemove')
                    .pipe(
                        throttleTime(10),
                    )
                    .subscribe((e: Event) => translateCanvas(e as MouseEvent));

                triggerAnimation();
                onReady();
            }, 1000);
        };

        void effect();

        return () => clearTimeout(timeoutId.value);
    }, [theme]);

    return (
        <section id='Landing' block='Landing'>
            <div elem='Content' ref={landingContentRef}>
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
                <p>
                    I craft applications with beautiful user interfaces and user experience in mind
                    for the web and desktop.
                </p>
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