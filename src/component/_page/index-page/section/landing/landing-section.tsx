import {
    memo,
    useEffect,
    type RefObject,
    useCallback,
    useRef } from 'react';
import './landing-section.style';
import type { Canvas } from './flowfield';
import flowfield from './flowfield';
import { useSettings } from '@store';

type LandingProps = {
    refFromParent: RefObject<HTMLElement>;
};

const renderCanvas = (canvas: Canvas) => requestAnimationFrame(() => {
    canvas.render();

    setTimeout(() => renderCanvas(canvas), 16.67);
});

const Landing = ({ refFromParent }: LandingProps) => {
    const color = useSettings(state => state.accentColor);
    const canvasRef = useRef<Canvas>();

    useEffect(() => {(!canvasRef.current) && (canvasRef.current = flowfield(color.value));}, []);

    const triggerLandingAnimation = useCallback(() => {
        const animated = document.querySelectorAll('.landing-initial-state');

        animated.forEach((element) => {
            const transitionEnd = () => {
                element.classList.add('animation-finished');
                element.removeEventListener('animationend', transitionEnd);
            };

            element.classList.replace('landing-initial-state', 'landing-animation');
            element.addEventListener('animationend', transitionEnd);
        });
    }, []);

    useEffect(() => {
        triggerLandingAnimation();
        renderCanvas(canvasRef.current!);
    }, []);

    useEffect(() => {
        canvasRef.current!.updateColor(color.value);
    }, [color]);

    return (
        <section id='Landing' block='Landing' ref={refFromParent}>
            <div elem='Content'>
                <h1 className='landing-initial-state'>
                    Hey, my name is
                    <br />
                    <span>
                        Balázs
                        <span className='accent'>.</span>
                    </span>
                </h1>
                <h2 className='landing-initial-state'>
                    I'm a
                    <span>
                        &nbsp;software developer
                        <span className='accent'>.</span>
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
            <canvas id='Flowfield'></canvas>
        </section>
    );
};

export default memo(Landing);
