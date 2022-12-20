import {
    lazy,
    memo,
    Suspense,
    useEffect,
    useMemo,
    useRef,
    useState,
    type RefObject
} from 'react';
import {
    type SPEObject,
    type Application as SplineApplication
} from '@splinetool/runtime';
import {
    fromEvent,
    Subscription,
    throttleTime
} from 'rxjs';
import { updateElementsToObserve } from '../../../../index';
import {
    Theme,
    useDevice,
    useSettings
} from 'Store';
import './Landing.style.scss';

import img__spline_light_mobile from 'Media/webp/spline-light-mobile.webp';
import img__spline_dark_mobile from 'Media/webp/spline-dark-mobile.webp';
import img__spline_light_desktop from 'Media/webp/spline-light-desktop.webp';
import img__spline_dark_desktop from 'Media/webp/spline-dark-desktop.webp';

const SplineWEBP = {
    Mobile: {
        Dark: img__spline_dark_mobile,
        Light: img__spline_light_mobile
    },
    Desktop: {
        Dark: img__spline_dark_desktop,
        Light: img__spline_light_desktop
    }
};

const SplineURL = {
    Dark: 'https://prod.spline.design/Orv626vNo2ELSt25/scene.splinecode',
    Light: 'https://prod.spline.design/oE1PXrOYS773cHVg/scene.splinecode',
    Switchable: 'https://prod.spline.design/2oNTUNbzmdhEMPUo/scene.splinecode'
};

// Remember the timeouts we'll use to temporarily halt the scroll animation when the page loads
let timeouts: NodeJS.Timeout[] = [];

// we need a way to animate initial load while keeping scroll animations, so at first we have the landing-animation class,
// then after 3 seconds we replace it, so we can have scroll animations
const recursivelyApplyClassNameTransformation = (element: HTMLElement) => {
    if (element?.classList?.replace('landing-initial-state', 'animate-on-scroll')) {
        updateElementsToObserve(element);
        element.classList.add('landing-animation');
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
    onSplineLoaded: () => void,
    loadingRef: RefObject<HTMLDivElement>,
    refFromParent: RefObject<HTMLElement>,
    shouldTriggerAnimation: boolean
};

// we use scale of background's X axis to determine color of background as such data isn't exposed
// (scale is switched withing Spline)
enum SplineBackgroundScaleX {
    DARK = 1,
    LIGHT = 2
};

const Landing = memo(({ onSplineLoaded, refFromParent, shouldTriggerAnimation }: LandingProps) => {
    const { theme } = useSettings();
    const { isDesktop } = useDevice();
    const splineRef = useRef<SplineApplication>();
    const splineAllRef = useRef<SPEObject>();
    const splineBackgroundRef = useRef<SPEObject>();
    const splineCanvasRef = useRef<HTMLCanvasElement | HTMLImageElement>(null);
    const [useBackup, setUseBackup] = useState(false);
    const Spline = isDesktop && lazy(() => import('@splinetool/react-spline'));

    const onSplineLoad = (splineApp: SplineApplication) => {
        splineRef.current = splineApp;
        splineAllRef.current = splineApp.findObjectByName('All');
        splineBackgroundRef.current = splineApp.findObjectByName('Background');

        onSplineLoaded();
        console.log('Spline is ready.', `${Math.round(performance.now())}ms`);
    };

    const triggerSplineAnimation = () => { // 'All' is the name of the object group we want to target
        splineRef.current?.emitEvent('mouseHover', 'All');
    };

    const translateSplineCanvas = (e: MouseEvent) => {
        if (!splineCanvasRef.current) return;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const x = (e.clientX - windowWidth / 2) / 100 * -1;
        const y = (e.clientY - windowHeight / 2) / 100 * -1;
        splineCanvasRef.current.style.translate = `${x}px ${y}px`;

        if (splineRef.current && splineAllRef.current) { // Rotate main group in 3D space
            splineAllRef.current.rotation.y = (x * 0.005);
            splineAllRef.current.rotation.x = (y * 0.005);
        }
    };

    useEffect(() => { // Spline backup plan
        let timeout: NodeJS.Timeout;
        if (isDesktop && !shouldTriggerAnimation) {
            timeout = setTimeout(() => {
                console.log('backup');
                setUseBackup(true);
            }, 5000);
        }

        return () => clearTimeout(timeout);
    }, [isDesktop, shouldTriggerAnimation]);

    useEffect(() => { // background color switch
        if (!splineBackgroundRef.current) return;

        if (splineBackgroundRef.current.scale.x === SplineBackgroundScaleX.DARK && theme === Theme.LIGHT) {
            console.log('setting to light');
            splineRef.current?.emitEvent('mouseUp', 'Background');
        }
        if (splineBackgroundRef.current.scale.x === SplineBackgroundScaleX.LIGHT && theme === Theme.DARK) {
            console.log('setting to dark');

            splineRef.current?.emitEventReverse('mouseUp', 'Background');
        }

    }, [theme, splineBackgroundRef.current]);

    useEffect(() => {
        let event: Subscription;

        if (shouldTriggerAnimation) {
            refFromParent.current && recursivelyApplyClassNameTransformation(refFromParent.current);
            triggerSplineAnimation();

            setTimeout(() => {
                event = fromEvent(
                    document,
                    'mousemove'
                )
                    .pipe( // 60 Hz => 16ms [30 Hz => 32ms]
                        throttleTime(32),
                    )
                    .subscribe((e: Event) => translateSplineCanvas(e as MouseEvent));
            }, 1000); // wait till the initial animation is finished, so the cursor-based animation doesn't bother it
        }

        return () => {
            timeouts.forEach((id) => clearTimeout(id));
            timeouts = []; // reset timeouts array

            event && event.unsubscribe();
        };
    }, [shouldTriggerAnimation]);

    // As this component eats performance for breakfast then spits it out and eats it again,
    // let's not re-render it unless necessary
    const SplineMemo = useMemo(() => {
        if (isDesktop && Spline && !useBackup) {
            return (
                <Spline
                    // @ts-ignore --- ignored because we need to set this ref to the image if Spline component times out
                    ref={splineCanvasRef}
                    onLoad={onSplineLoad}
                    scene={SplineURL.Switchable}
                />
            );
        }

        const src = SplineWEBP[isDesktop ? 'Desktop' : 'Mobile'][theme === Theme.LIGHT ? 'Light' : 'Dark'];

        return (
            <img
                src={src}
                onLoad={onSplineLoaded}
                // @ts-ignore --- ignored because we need to set this ref to the image if Spline component times out
                ref={splineCanvasRef}
                className='landing-initial-state'
                alt={`
                    An image of the 3D animation you would see on a desktop device,
                    but alas, mobile devices aren't powerful enough for that.
                `}
            />
        );
    }, [theme, isDesktop, useBackup]);

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
            <div elem='Spline' mods={{ IS_BACKUP: useBackup }}>
                <Suspense fallback={null}>
                    {SplineMemo}
                </Suspense>
            </div>
        </section>
    );
});

export default Landing;