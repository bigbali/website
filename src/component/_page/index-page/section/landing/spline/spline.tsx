import { lazy, memo, Suspense, useEffect, useMemo, useState } from 'react';
import type { SPEObject } from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { type Application as SplineApplication } from '@splinetool/runtime';
import Image from 'next/image';
import { Theme, useDevice, useSettings } from '@store';
import type { Subscription } from 'rxjs';
import { fromEvent, throttleTime } from 'rxjs';
import Icon from '@component/icon';

import img__spline_light_mobile from '@media/webp/spline-light-mobile.webp';
import img__spline_dark_mobile from '@media/webp/spline-dark-mobile.webp';
import img__spline_light_desktop from '@media/webp/spline-light-desktop.webp';
import img__spline_dark_desktop from '@media/webp/spline-dark-desktop.webp';

type Spline = {
    app: Application | null;
    group: SPEObject | null;
    background: SPEObject | null;
    canvas: HTMLCanvasElement | null;
};

const spline: Spline = {
    app: null,
    group: null,
    background: null,
    canvas: null
};

const translate = (e: MouseEvent) => {
    if (!spline.app) return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const x = ((e.clientX - windowWidth / 2) / 100) * -1;
    const y = ((e.clientY - windowHeight / 2) / 100) * -1;
    spline.canvas!.style.translate = `${x * -4}px ${y * -4}px`;

    spline.group!.rotation.y = x * 0.01;
    spline.group!.rotation.x = y * 0.01;
};

let event: Subscription;
let loaded = false;

const DELAY = 1000;
const DURATION = 1500;
const TIMEOUT = 5000;

const load = (app: SplineApplication) => {
    spline.app = app;
    spline.canvas = app.canvas;
    spline.group = app.findObjectByName('All')!;
    spline.background = app.findObjectByName('Background')!;

    updateSplineBackgroundColor(true);

    setTimeout(() => {
        event = fromEvent(document, 'mousemove')
            .pipe(
                // 60 Hz => 16ms [30 Hz => 32ms]
                throttleTime(32)
            )
            .subscribe((e: Event) => translate(e as MouseEvent));
    }, DELAY + DURATION);

    return () => {
        if (event) {
            event.unsubscribe();
        }
    };
};

// we use scale of background plane's X axis to determine color of background as such data isn't exposed
// (scale is switched within Spline)
enum SplineBackgroundScaleX {
    DARK = 1,
    LIGHT = 2
}

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

const Fallback = () => (
    <div block='Fallback'>
        <Icon.Loader />
    </div>
);

const updateSplineBackgroundColor = (instant = false) => {
    const theme = useSettings.getState().theme;

    if (!spline.app) return;

    if (
        instant &&
        spline.background!.scale.x === SplineBackgroundScaleX.DARK &&
        theme === Theme.LIGHT
    ) {
        spline.app.emitEvent('mouseDown', 'Background');
    } else if (
        spline.background!.scale.x === SplineBackgroundScaleX.DARK &&
        theme === Theme.LIGHT
    ) {
        spline.app.emitEvent('mouseUp', 'Background');
    }

    if (
        spline.background!.scale.x === SplineBackgroundScaleX.LIGHT &&
        theme === Theme.DARK
    ) {
        spline.app.emitEventReverse('mouseUp', 'Background');
    }
};

const CustomSpline = () => {
    const theme = useSettings((store) => store.theme);
    const desktop = useDevice((store) => store.isDesktop);
    const [fallback, setFallback] = useState(false);

    loaded = false;

    useEffect(() => {
        updateSplineBackgroundColor();

        const timeout = setTimeout(() => setFallback(loaded), TIMEOUT);

        return () => clearTimeout(timeout);
    }, [theme]);

    const SplineMemo = useMemo(() => {
        if (desktop) {
            // If we use dynamic(), it apparently messes with Spline's forwardRef,
            // causing it to be dropped and throwing a console error.
            // Also, without Suspense we get render loop for a few seconds.
            const Spline = lazy(() => import('@splinetool/react-spline'));
            // const Spline = lazy(() => import('@splinetool/react-spline').then((module) => {
            //     return new Promise((resolve) => {
            //         setTimeout(() => {
            //             resolve(module as any);
            //         }, 10000);
            //     });
            // }));

            return (
                <Suspense fallback={<Fallback />}>
                    <Spline
                        onLoad={load}
                        scene='https://prod.spline.design/2oNTUNbzmdhEMPUo/scene.splinecode'
                    />
                </Suspense>
            );
        }
    }, [desktop]);

    if (desktop && !fallback) {
        return SplineMemo!;
    }

    const src = SplineWEBP[desktop ? 'Desktop' : 'Mobile'][theme === Theme.LIGHT ? 'Light' : 'Dark'];

    return (
        <Image
            src={src}
            priority
            alt={`
                    An image of the 3D animation you would see on a desktop device,
                    but alas, most mobile devices aren't powerful enough for that.
                `}
        />
    );
};

export default memo(CustomSpline);
