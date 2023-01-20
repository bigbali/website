import {
    lazy,
    memo,
    MutableRefObject,
    Suspense,
    useEffect,
    useMemo
} from 'react';
import { type SPEObject } from '@splinetool/react-spline';
import { type Application as SplineApplication } from '@splinetool/runtime';
import Image from 'next/image';
import { Theme, useSettings } from 'Store';

import img__spline_light_mobile from 'Media/webp/spline-light-mobile.webp';
import img__spline_dark_mobile from 'Media/webp/spline-dark-mobile.webp';
import img__spline_light_desktop from 'Media/webp/spline-light-desktop.webp';
import img__spline_dark_desktop from 'Media/webp/spline-dark-desktop.webp';

type CustomSplineProps = {
    isSplineLoaded: boolean,
    isDesktop: boolean | undefined,
    onSplineLoad: (splineApp?: SplineApplication) => void,
    splineBackgroundRef: MutableRefObject<SPEObject | undefined>,
    splineCanvasRef: MutableRefObject<HTMLCanvasElement | HTMLImageElement | undefined>,
    splineRef: MutableRefObject<SplineApplication | undefined>,
    useBackup: boolean
};

const SplineURL = {
    Dark: 'https://prod.spline.design/Orv626vNo2ELSt25/scene.splinecode',
    Light: 'https://prod.spline.design/oE1PXrOYS773cHVg/scene.splinecode',
    Switchable: 'https://prod.spline.design/2oNTUNbzmdhEMPUo/scene.splinecode'
};

// we use scale of background plane's X axis to determine color of background as such data isn't exposed
// (scale is switched withing Spline)
enum SplineBackgroundScaleX {
    DARK = 1,
    LIGHT = 2
};

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

const CustomSpline = ({
    isSplineLoaded,
    splineBackgroundRef,
    splineRef,
    splineCanvasRef,
    isDesktop,
    useBackup,
    onSplineLoad
}: CustomSplineProps) => {
    const theme = useSettings(state => state.theme);

    // Need to memoize this, because:
    // 1. it's quite expensive to render
    // 2. we don't want to rerender it when theme changes, because we set the background in the useEffect
    const SplineMemo = useMemo(() => {
        if (isDesktop && !useBackup) {
            // If we use dynamic(), it apparently messes with Spline's forwardRef,
            // causing it to be dropped and throwing a console error.
            // Also, without Suspense we get render loop for a few seconds.
            const Spline = lazy(() => import('@splinetool/react-spline'));

            return (
                <Suspense fallback={null}>
                    <Spline
                        // @ts-ignore - ignored because we need to set this ref to the image if Spline component times out
                        ref={splineCanvasRef}
                        onLoad={onSplineLoad}
                        scene={SplineURL.Switchable}
                    />
                </Suspense>
            );
        }
    }, [isDesktop, useBackup]);

    useEffect(() => { // background color switch
        if (!splineBackgroundRef.current) return;

        if (splineBackgroundRef.current.scale.x === SplineBackgroundScaleX.DARK && theme === Theme.LIGHT) {
            splineRef.current?.emitEvent('mouseUp', 'Background');
        }
        if (splineBackgroundRef.current.scale.x === SplineBackgroundScaleX.LIGHT && theme === Theme.DARK) {
            splineRef.current?.emitEventReverse('mouseUp', 'Background');
        }

    }, [theme, isSplineLoaded, splineBackgroundRef.current]);

    if (isDesktop && !useBackup && SplineMemo) {
        return SplineMemo;
    }

    const src = SplineWEBP[isDesktop ? 'Desktop' : 'Mobile'][theme === Theme.LIGHT ? 'Light' : 'Dark'];

    return (
        <Image
            src={src}
            onLoad={() => onSplineLoad()}
            // @ts-ignore --- ignored because we need to set this ref to the image if Spline component times out
            ref={splineCanvasRef}
            priority
            className='landing-initial-state'
            alt={`
                    An image of the 3D animation you would see on a desktop device,
                    but alas, most mobile devices aren't powerful enough for that.
                `}
        />
    );
};

export default memo(CustomSpline);