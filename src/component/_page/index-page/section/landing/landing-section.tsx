import {
    memo,
    useCallback,
    useEffect,
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
import dynamic from 'next/dynamic';
import { useDevice } from 'Store';
import './landing-section.style';

const CustomSpline = dynamic(() => import('./spline'), { ssr: false });

const triggerLandingAnimation = () => {
    document.querySelectorAll('.landing-initial-state').forEach((element) => {
        element.classList.replace('landing-initial-state', 'landing-animation');

        // Need to cancel animation-delay because it delays the cursor-based translate as well
        setTimeout(() => element.classList.add('animation-finished'), 1200);
    });
};

type LandingProps = {
    isSplineLoaded: boolean,
    setSplineLoaded: () => void,
    loadingRef: RefObject<HTMLDivElement>,
    refFromParent: RefObject<HTMLElement>
};

let event: Subscription;

const Landing = ({ isSplineLoaded, setSplineLoaded, refFromParent }: LandingProps) => {
    const isDesktop = useDevice(state => state.isDesktop);
    const splineRef = useRef<SplineApplication>();
    const splineAllRef = useRef<SPEObject>();
    const splineBackgroundRef = useRef<SPEObject>();
    const splineCanvasRef = useRef<HTMLCanvasElement | HTMLImageElement>();
    const [useBackup, setUseBackup] = useState(false);

    // Need to memoize the function because when isSplineLoaded changes,
    // this component re-renders and a new instance of onSplineLoad will be passed
    // to CustomSpline, causing it to re-render while already loading
    const onSplineLoad = useCallback((splineApp?: SplineApplication) => {
        if (splineApp) {
            splineRef.current = splineApp;
            splineAllRef.current = splineApp.findObjectByName('All');
            splineBackgroundRef.current = splineApp.findObjectByName('Background');
        }

        setSplineLoaded();
        triggerSplineAnimation();
        triggerLandingAnimation();

        setTimeout(() => {
            event = fromEvent(
                document,
                'mousemove'
            )
                .pipe( // 60 Hz => 16ms [30 Hz => 32ms]
                    throttleTime(32),
                )
                .subscribe((e: Event) => translateSplineCanvas(e as MouseEvent));
        }, 1200); // wait till the initial animation is finished, so the cursor-based animation doesn't bother it

        return () => {
            if (event) {
                event.unsubscribe();
            }
        };
    }, []);

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

    console.log(isSplineLoaded);

    useEffect(() => { // Spline backup plan
        let timeout: NodeJS.Timeout;

        if (isDesktop && !isSplineLoaded) {
            timeout = setTimeout(() => {
                setUseBackup(true);
            }, 7500);
        }

        return () => clearTimeout(timeout);
    }, [isDesktop, isSplineLoaded]);

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
                    I bring your imagination to life
                    by crafting applications with beautiful user interfaces
                    and intuitive user experiences in mind.
                </p>
            </div>
            <div elem='Spline' mods={{ IS_BACKUP: useBackup, IS_LOADING: !isSplineLoaded }}>
                <CustomSpline
                    isSplineLoaded={isSplineLoaded}
                    isDesktop={isDesktop}
                    onSplineLoad={onSplineLoad}
                    splineBackgroundRef={splineBackgroundRef}
                    splineCanvasRef={splineCanvasRef}
                    splineRef={splineRef}
                    useBackup={useBackup}
                />
            </div>
        </section>
    );
};

export default memo(Landing);