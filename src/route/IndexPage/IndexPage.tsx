
import { useCallback, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Transition from 'Component/Transition';
import Section from './Section';
import './IndexPage.style';

export const IndexPage = () => {
    const [isReady, setIsReady] = useState(false);
    const loadingRef = useRef<HTMLDivElement>(null);
    const onReady = useCallback(() => setIsReady(true), []);

    return (
        <div block='IndexPage'>
            <TransitionGroup component={null}>
                {!isReady && (
                    <Transition timeout={500} classNames='IndexPage-Loading'>
                        <div block='IndexPage' elem='Loading' ref={loadingRef}>
                            <div className='Loader' />
                            <span>
                                balázs burján
                            </span>
                        </div>
                    </Transition>
                )}
            </TransitionGroup>
            <Section.Landing onReady={onReady} loadingRef={loadingRef} />
            <Section.Projects />
            <Section.About />
            <Section.Contact />
        </div>
    );
};

export default IndexPage;