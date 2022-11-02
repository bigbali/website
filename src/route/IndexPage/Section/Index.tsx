import Spline from '@splinetool/react-spline';
import { Application as SplineApplication } from '@splinetool/runtime';
import { useEffect, useRef } from 'react';
import { Theme } from 'Store';
import { useSettings } from 'Util';
import './Index.style.scss';

const SplineURL = {
    light: 'https://prod.spline.design/QtRgBHPKynDO4AfI/scene.splinecode',
    dark: 'https://prod.spline.design/XmIopwGYaPfZKReY/scene.splinecode'
};

const Index = ({ onReady }: { onReady: () => void }) => {
    const [{ theme }] = useSettings();
    const spline = useRef<SplineApplication>();


    useEffect(() => {
        const id = setTimeout(() => {
            triggerAnimation();
            onReady();
        }, 1000);
        return () => clearTimeout(id);
    }, [theme]);

    const onLoad = (splineApp: SplineApplication) => {
        spline.current = splineApp;
    };

    const triggerAnimation = () => {
        spline.current?.emitEvent('mouseHover', 'All');
    };


    return (
        <section id='Home' block='SectionHome'>
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
                    I bring your imagination
                </span>
                <span>
                    to life
                    <span className='accent'>
                        .
                    </span>
                </span>
            </h3>
            <div elem='SplineWrapper'>
                <Spline
                    onLoad={onLoad}
                    scene={
                        theme === Theme.LIGHT
                            ? SplineURL.light
                            : SplineURL.dark
                    }
                />
            </div>
        </section>
    );
};

export default Index;