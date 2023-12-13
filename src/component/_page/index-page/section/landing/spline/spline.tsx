import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SPEObject } from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { type Application as SplineApplication } from '@splinetool/runtime';
import Image from 'next/image';
import { Theme, useDevice, useSettings } from '@store';
import type { Subscription } from 'rxjs';
import { fromEvent, throttleTime } from 'rxjs';
import { Loader } from '@component/icon';

import img__spline_light_mobile from '@media/webp/spline-light-mobile.webp';
import img__spline_dark_mobile from '@media/webp/spline-dark-mobile.webp';
import img__spline_light_desktop from '@media/webp/spline-light-desktop.webp';
import img__spline_dark_desktop from '@media/webp/spline-dark-desktop.webp';

import img__spline_dark_loading from '@media/webp/spline-dark-loading.webp';
import img__spline_light_loading from '@media/webp/spline-light-loading.webp';

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

const Fallback = () => {
    const theme = useSettings(store => store.theme);

    return (
        <div block='Fallback'>
            <Image
                src={theme === Theme.DARK ? img__spline_dark_loading : img__spline_light_loading}
                placeholder='blur'
                alt='Loading 3D scene, please wait...'
            />
            <Loader />
        </div>
    );
};

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

let resolver: any;

const CustomSpline = ({ deferRendering }: {deferRendering: boolean}) => {
    const theme = useSettings((store) => store.theme);
    const desktop = useDevice((store) => store.isDesktop);
    const [fallback, setFallback] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const unloadRef = useRef<() => void>();

    const onLoad = useCallback((app: SplineApplication) => {
        setLoaded(true);
        unloadRef.current = load(app);
    }, []);

    useEffect(() => {
        updateSplineBackgroundColor();

        const timeout = setTimeout(() => setFallback(loaded), TIMEOUT);

        return () => clearTimeout(timeout);
    }, [theme]);

    useEffect(() => {
        if (loaded && spline.canvas) {
            spline.canvas.style.opacity = '1';
        }

        return unloadRef.current;
    }, [loaded, deferRendering]);

    const SplineMemo = useMemo(() => {
        if (desktop) {
            // NOTE we need to keep this from lagging the browser during the initial animations,
            // so we start rendering it only after the animations are done
            const Spline = lazy(() => import('@splinetool/react-spline').then((module) => {
                return new Promise((resolve) => {
                    resolver = () => resolve(module as any);
                    setTimeout(() => {
                        resolve(module as any);
                    }, TIMEOUT);
                });
            }));

            return (
                <Suspense fallback={<Fallback />}>
                    <Spline
                        onLoad={onLoad}
                        // scene='https://prod.spline.design/2oNTUNbzmdhEMPUo/scene.splinecode'
                        scene='/scene.splinecode'
                    />
                </Suspense>
            );
        }
    }, [desktop]);

    if (!deferRendering) {
        resolver && resolver();
    }

    if (desktop && !fallback) {
        return SplineMemo!;
    }

    const src = SplineWEBP[desktop ? 'Desktop' : 'Mobile'][theme === Theme.LIGHT ? 'Light' : 'Dark'];

    return (
        <Image
            src={src}
            priority
            placeholder='blur'
            alt={`
                    An image of the 3D scene you would see on a desktop device,
                    but alas, most mobile devices aren't powerful enough for that.
                `}
        />
    );
};

export default memo(CustomSpline);
