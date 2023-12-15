import { useCallback, useEffect, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Close, HamburgerMenu } from '@component/icon';
import Transition from '@component/transition';
import Settings from '@component/settings';
import type { NavigationElementProps } from '../navigation';
import NavigationList from '../navigation-list';
import './navigation-mobile.style';

const NavigationMobile = ({ listProps }: NavigationElementProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const transitionRef = useRef<HTMLDivElement>(null);

    const closeMenu = useCallback(() => setIsExpanded(false), []);

    useEffect(() => {
        // Disable scrolling while the menu is open
        document.body.classList.toggle('disable-scrolling', isExpanded);
    }, [isExpanded]);

    return (
        <TransitionGroup component={null}>
            <button
                block='Navigation'
                elem='Expander'
                onClick={() => setIsExpanded((state) => !state)}
            >
                <HamburgerMenu isExpanded={isExpanded} />
            </button>
            {isExpanded && (
                <Transition
                    in
                    appear
                    timeout={{
                        enter: 200,
                        exit: 100
                    }}
                    // @ts-ignore - nodeRef is expecting RefObject<undefined>, which is not reasonable
                    nodeRef={transitionRef}
                    classNames='Navigation'
                >
                    <div block='Navigation' elem='Menu' ref={transitionRef}>
                        <div elem='MenuContent'>
                            <h1 elem='Heading'>Menu</h1>
                            <NavigationList
                                {...listProps}
                                onNavigationItemClickEffect={closeMenu}
                            />
                            <div elem='Settings'>
                                <Settings isMobile />
                            </div>
                        </div>
                        <button elem='Exit' onClick={closeMenu}>
                            <Close />
                        </button>
                    </div>
                </Transition>
            )}
        </TransitionGroup>
    );
};

export default NavigationMobile;
