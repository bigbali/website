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
import { useDevice } from '@store';
import './landing-section.style';

// import CustomSpline from './spline';

const CustomSpline = dynamic(() => import('./spline'), { ssr: false });

const triggerLandingAnimation = () => {
    document.querySelectorAll('.landing-initial-state').forEach((element) => {
        const animationEnd = () => {
            element.classList.add('animation-finished');
            element.removeEventListener('transitionend', animationEnd);
        };

        element.classList.replace('landing-initial-state', 'landing-animation');
        element.addEventListener('transitionend', animationEnd);
    });
};

type LandingProps = {
    isSplineLoaded: boolean,
    setSplineLoaded: () => void,
    refFromParent: RefObject<HTMLElement>
};

let event: Subscription;

const Landing = ({ refFromParent }: LandingProps) => {
    const isDesktop = useDevice(state => state.isDesktop);
    const splineRef = useRef<SplineApplication>();
    const splineAllRef = useRef<SPEObject>();
    const splineBackgroundRef = useRef<SPEObject>();
    const splineCanvasRef = useRef<HTMLCanvasElement | HTMLImageElement>();
    const [useBackup, setUseBackup] = useState(false);

    useEffect(() => triggerLandingAnimation(), []);

    // Need to memoize the function because when isSplineLoaded changes,
    // this component re-renders and a new instance of onSplineLoad will be passed
    // to CustomSpline, causing it to re-render while already loading

    // const triggerSplineAnimation = () => { // 'All' is the name of the object group we want to target
    //     splineRef.current?.emitEvent('mouseHover', 'All');
    // };


    // useEffect(() => { // Spline backup plan
    //     let timeout: NodeJS.Timeout;

    //     if (isDesktop && !isSplineLoaded) {
    //         timeout = setTimeout(() => {
    //             setUseBackup(true);
    //         }, 7500);
    //     }

    //     return () => clearTimeout(timeout);
    // }, [isDesktop, isSplineLoaded]);

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
                    I bring imagination to reality by crafting software with
                    <span className='highlight'>
                        &nbsp;beautiful user interfaces&nbsp;
                    </span>
                    and
                    <span className='highlight'>
                        &nbsp;great user experience
                        <span className='accent'>.</span>
                    </span>
                </p>
            </div>
            <div elem='Spline'>
                <CustomSpline />
            </div>
        </section>
    );
};

export default memo(Landing);