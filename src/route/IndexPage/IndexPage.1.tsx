import Transition from 'Component/Transition';
import { useEffect, useRef, useState } from 'react';
import { SwitchTransition, TransitionGroup } from 'react-transition-group';
// @ts-ignore
import BackgroundVideo from '../../media/mp4/index-bg.mp4';
// @ts-ignore
import Ocean from '../../media/mp4/ocean.mp4';
// @ts-ignore
import Cubes from '../../media/mp4/cubes.mp4';
import './IndexPage.style';

// const stuffIDo = [
//     'develop software',
//     'take photos',
//     'admire cars',
//     'water my plants',
//     'play with my cats'
// ];

export const IndexPage = () => {
    const [headerContent, setHeaderContent] = useState('Balázs');
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            (videoRef.current as HTMLVideoElement).playbackRate = 1;
        }

        const timeoutId = setTimeout(() => {
            setHeaderContent('a software developer');
        }, 9000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div block='IndexPage'>
            <TransitionGroup component={null}>
                <Transition in appear classNames='IndexPage-Hey' timeout={{ enter: 1500, exit: 3000 }}>
                    <div elem='Hey'>
                        Hey
                    </div>
                </Transition>
            </TransitionGroup>

            <div elem='MainContent'>
                {/* <TransitionGroup component={null}>
                    <Transition in appear classNames='IndexPage-Hey' timeout={{ enter: 3000, exit: 3000 }}>
                        <div elem='Hey'>
                            Hey
                        </div>
                    </Transition>
                    <Transition in appear classNames='IndexPage-Im' timeout={{ enter: 4000, exit: 3000 }}>
                        <div elem='Im'>
                            {'I\'m'}
                        </div>
                    </Transition>
                </TransitionGroup>
                <SwitchTransition>
                    <Transition in appear classNames='IndexPage-Who' timeout={{ enter: 4000, exit: 3000 }}>
                        <div elem='Who'>
                            {headerContent}
                        </div>
                    </Transition>
                </SwitchTransition> */}
            </div>
            <div style={{ height: '100vh', backgroundColor: 'var(--color-background-primary)' }}>

            </div>
            <div elem='VideoWrapper'>
                <video elem='Video' autoPlay muted loop ref={videoRef}>
                    <source src={Ocean} type="video/mp4"></source>
                </video>
            </div>
        </div>
    );
};

export default IndexPage;