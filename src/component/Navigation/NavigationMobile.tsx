import {
    useState,
    useEffect,
    useRef,
    memo
} from 'react';
import { useLocation } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import Icon from 'Component/Icon';
import Transition from 'Component/Transition';
import Settings from 'Component/Settings';
import NavigationItem from './NavigationItem';
import { navigationMap } from './';
import './Navigation.style';

const NavigationMobile = memo(() => { // memo prevents unnecessary render which triggers animation
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const ref = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            document.querySelector('body')!.classList.add('disable-scrolling');
        } else {
            document.querySelector('body')!.classList.remove('disable-scrolling');
        }
    }, [isExpanded]);

    useEffect(() => { // when we click on a navigation item, close the menu, but first wait for the animations
        const id = setTimeout(() => setIsExpanded(false), 300);
        return () => clearTimeout(id);
    }, [location]);

    const Menu = (
        isExpanded && (
            <Transition
                in
                appear
                timeout={{
                    enter: 200,
                    exit: 100
                }}
                nodeRef={ref}
                classNames='Navigation-Mobile'
            >
                <div block='Navigation' elem='Mobile' ref={ref}>
                    <div elem='Mobile-Menu'>
                        <nav elem='Nav'>
                            <h1 elem='MobileHeader'>
                                Menu
                            </h1>
                            <ul elem='List'>
                                {navigationMap.map(NavigationItem)}
                            </ul>
                        </nav>
                        <div elem='Settings'>
                            <Settings.Mobile />
                        </div>
                    </div>
                    <div elem='Mobile-Menu-Exit' onClick={() => setIsExpanded(false)}>
                        <Icon.Close />
                    </div>
                </div>
            </Transition>
        )
    );

    return (
        <TransitionGroup component={null}>
            <div
                block='Navigation'
                elem='HamburgerIconWrapper'
                onClick={() => setIsExpanded((state) => !state)}
            >
                <Icon.HamburgerMenu isExpanded={isExpanded} />
            </div>
            {Menu}
        </TransitionGroup>
    );
});

export default NavigationMobile;