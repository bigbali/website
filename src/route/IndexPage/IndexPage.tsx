
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Transition from 'Component/Transition';
import Section from './Section';
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
            <Section.Landing onReady={() => setIsReady(true)} />
            <Section.Projects />
            <Section.About />
            <Section.Contact />
        </div>
    );
};

export default IndexPage;