import Spline from '@splinetool/react-spline';

// @ts-ignore
import './IndexPage.style';
import { useSettings } from 'Util';
import { Theme } from 'Store';
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Transition from 'Component/Transition';

const SplineURL = {
    light: 'https://prod.spline.design/QtRgBHPKynDO4AfI/scene.splinecode',
    dark: 'https://prod.spline.design/XmIopwGYaPfZKReY/scene.splinecode'
};


export const IndexPage = () => {
    const [{ theme }] = useSettings();
    const [isReady, setIsReady] = useState(false);

    return (
        <div block='IndexPage'>
            <TransitionGroup>
                {!isReady && (
                    <Transition timeout={200} classNames='IndexPage-Loading'>
                        <div block='IndexPage' elem='Loading'>
                            loading yo
                        </div>
                    </Transition>
                )}
            </TransitionGroup>
            <section id='Home' block='SectionHome'>
                <h1>
                    Hey,
                    <br />
                    <span>
                        I'm Balázs
                        <span>
                            .
                        </span>
                    </span>
                </h1>
                <h2>
                    I bring your imagination
                    <br />
                    <span>
                        to life.
                    </span>
                </h2>
                <div elem='SplineWrapper'>
                    <Spline
                        onLoad={() => setIsReady(true)}
                        scene={
                            theme === Theme.LIGHT
                                ? SplineURL.light
                                : SplineURL.dark
                        }
                    />
                </div>
                <div block='ContentWrapper'>
                </div>
            </section>
            <section id='Projects' block='SectionProjects'>
                <h1>
                    Check out these projects
                </h1>

            </section>
            <section id='About' block='SectionAbout'>

            </section>
            <section id='Contact' block='SectionContact'>

            </section>
        </div>
    );
};

export default IndexPage;