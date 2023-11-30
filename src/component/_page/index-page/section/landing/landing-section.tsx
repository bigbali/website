import {
    memo,
    useEffect,
    type RefObject
} from 'react';
import dynamic from 'next/dynamic';
import './landing-section.style';

const CustomSpline = dynamic(() => import('./spline'), { ssr: false });

const triggerLandingAnimation = () => {
    document.querySelectorAll('.landing-initial-state').forEach((element) => {
        const animationEnd = () => {
            element.classList.add('animation-finished');
            element.removeEventListener('animationend', animationEnd);
        };

        element.classList.replace('landing-initial-state', 'landing-animation');
        element.addEventListener('animationend', animationEnd);
    });
};

type LandingProps = {
    refFromParent: RefObject<HTMLElement>;
};


const Landing = ({ refFromParent }: LandingProps) => {
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
                <CustomSpline />
            </div>
        </section>
    );
};

export default memo(Landing);
