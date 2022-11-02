
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Transition from 'Component/Transition';
import Index from './Section/Index';
import './IndexPage.style';
import Projects from './Section/Projects';

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
            <section id='About' block='SectionAbout'>
                <h1>
                    Who I am
                </h1>
            </section>
            <section id='Contact' block='SectionContact'>
                <h1>
                    Reach out to me
                </h1>
            </section>
        </div>
    );
};

export default IndexPage;