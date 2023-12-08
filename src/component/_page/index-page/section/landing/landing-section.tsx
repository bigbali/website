import {
    memo,
    useEffect,
    type RefObject,
    useState,
    useCallback
} from 'react';
import dynamic from 'next/dynamic';
import './landing-section.style';

const CustomSpline = dynamic(() => import('./spline'), { ssr: false });


type LandingProps = {
    refFromParent: RefObject<HTMLElement>;
};

const Landing = ({ refFromParent }: LandingProps) => {
    const [deferSplineRender, setDeferSplineRender] = useState(true);

    const triggerLandingAnimation = useCallback(() => {
        const animated = document.querySelectorAll('.landing-initial-state');

        animated.forEach((element, index) => {
            const transitionEnd = () => {
                if (index + 1 === animated.length) {
                    setDeferSplineRender(false);
                }

                element.classList.add('animation-finished');
                element.removeEventListener('transitionend', transitionEnd);
            };

            element.classList.replace('landing-initial-state', 'landing-animation');
            element.addEventListener('transitionend', transitionEnd);
        });
    }, []);

    useEffect(() => triggerLandingAnimation(), []);

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
            <div elem='Spline'>
                <CustomSpline deferRendering={deferSplineRender} />
            </div>
        </section>
    );
};

export default memo(Landing);
