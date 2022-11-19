import {
    memo,
    RefObject,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { Application as SplineApplication } from '@splinetool/runtime';
import Spline from '@splinetool/react-spline';
import {
    fromEvent,
    throttleTime
} from 'rxjs';
import FontFaceObserver from 'fontfaceobserver';
import { updateElementsToObserve } from '../../../../index';
import { Theme } from 'Store';
import { useSettings } from 'Util';
import './Landing.style.scss';

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

// Remember the timeouts we'll use to temporarily halt the scroll animation when the page loads
let timeouts: NodeJS.Timeout[] = [];

const recursivelyApplyClassNameTransformation = (element: HTMLElement) => {
    if (element?.classList?.replace('landing-initial-state', 'animate-on-scroll')) {
        updateElementsToObserve(element);
        element.classList.add('landing-animation');

        // this one's for scroll animation
        element.classList.toggle('begin-animation');

        timeouts.push(setTimeout(() => {
            (element).classList.remove('landing-animation');
        }, 3000));
    }

    if (element.childNodes.length === 0) return;

    element.childNodes.forEach((childNode) => {
        recursivelyApplyClassNameTransformation(childNode as HTMLElement);
    });
};

type LandingProps = {
    onFontsLoaded: () => void,
    onSplineLoaded: () => void,
    loadingRef: RefObject<HTMLDivElement>,
    refFromParent: RefObject<HTMLElement>,
    shouldTriggerAnimation: boolean
};

const Landing = memo(({ onFontsLoaded, onSplineLoaded, refFromParent, shouldTriggerAnimation }: LandingProps) => {
    const [{ theme }] = useSettings();
    const splineRef = useRef<SplineApplication>();
    const splineCanvasRef = useRef<HTMLCanvasElement>(null);

    const onSplineLoad = (splineApp: SplineApplication) => {
        splineRef.current = splineApp;

        onSplineLoaded();
        console.log('spline ready', `${Math.round(performance.now())}ms`);
    };

    const triggerSplineAnimation = () => { // 'All' is the name of the object group we want to target
        splineRef.current?.emitEvent('mouseHover', 'All');
    };

    function translateSplineCanvas(e: MouseEvent) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const x = (e.clientX - windowWidth / 2) / 100 * -1;
        const y = (e.clientY - windowHeight / 2) / 100 * -1;
        splineCanvasRef.current!.style.translate = `${x}px ${y}px`;
    }

    useEffect(() => {
        void (async () => {
            await fontsReady();
            onFontsLoaded();
            console.log('fonts ready', `${Math.round(performance.now())}ms`);
        })();
    }, []);

    useEffect(() => {
        const event = fromEvent(
            document,
            'mousemove'
        )
            .pipe( // 60 Hz
                throttleTime(16),
            )
            .subscribe((e: Event) => translateSplineCanvas(e as MouseEvent));

        return () => event.unsubscribe();
    }, [theme]);

    useEffect(() => {
        timeouts = [];

        if (shouldTriggerAnimation) {
            refFromParent.current && recursivelyApplyClassNameTransformation(refFromParent.current);
            triggerSplineAnimation();
        }

        return () => timeouts.forEach((id) => clearTimeout(id));
    }, [shouldTriggerAnimation]);

    // As this component eats performance for breakfast then spits it out and eats it again,
    // let's not render it unless necessary
    const SplineMemo = useMemo(() => (
        <Spline
            ref={splineCanvasRef}
            onLoad={onSplineLoad}
            scene={
                theme === Theme.LIGHT
                    ? SplineURL.LightV2
                    : SplineURL.Dark
            }
        />
    ), [theme]);

    return (
        <section
            id='Landing'
            block='Landing'
            ref={refFromParent}
        >
            <div elem='Content'>
                <h1 className='landing-initial-state'>
                    Hey, my name is
                    <br />
                    <span>
                        Balázs
                        <span className='accent'>
                            .
                        </span>
                    </span>
                </h1>
                <h2 className='landing-initial-state'>
                    I'm a
                    <span>
                        &nbsp;software developer
                        <span className='accent'>
                            .
                        </span>
                    </span>
                </h2>
                <p className='landing-initial-state'>
                    I craft applications with beautiful user interfaces and user experience in mind
                    for the web and desktop.
                </p>
            </div>
            <div elem='Spline'>
                {SplineMemo}
            </div>
        </section>
    );
});

export default Landing;