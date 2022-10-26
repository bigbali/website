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
            <div elem='AbsoluteBackground' />
            <section id='Home' block='SectionHome'>
                <div block='ContentWrapper'>
                    <div elem='Left'>
                        <h1>
                            Hey, my name is
                            <br />
                            <span>
                                Balázs.
                            </span>
                        </h1>
                        <h2>
                            I bring your imagination
                        </h2>
                    </div>
                    <div elem='Right'>
                        <h2>
                            <span>
                                &nbsp;to life.
                            </span>
                        </h2>
                        <video src={Ocean} autoPlay muted loop />
                    </div>
                </div>
            </section>
            <section id='Projects' block='SectionProjects'>

            </section>
            <section id='About' block='SectionAbout'>

            </section>
            <section id='Contact' block='SectionContact'>

            </section>
        </div>
    );
};

export default IndexPage;