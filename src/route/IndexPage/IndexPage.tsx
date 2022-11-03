
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Transition from 'Component/Transition';
import Index from './Section/Index';
import Projects from './Section/Projects';
import About from './Section/About';
import './IndexPage.style';

export const IndexPage = () => {
    const [isReady, setIsReady] = useState(false);

    return (
        <div block='IndexPage'>
            <TransitionGroup component={null}>
                {!isReady && (
                    <Transition timeout={500} classNames='IndexPage-Loading'>
                        <div block='IndexPage' elem='Loading'>
                            balázs burján
                        </div>
                    </Transition>
                )}
            </TransitionGroup>
            <Index onReady={() => setIsReady(true)} />
            <Projects />
            <About />
            <section id='Contact' block='SectionContact'>
                <h1>
                    Reach out to me
                </h1>
            </section>
        </div>
    );
};

export default IndexPage;