import {
    useState,
    useEffect,
    useRef,
    memo,
    type MouseEvent as GenericMouseEvent
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import { scrollIntoView } from 'Util';
import { useSection } from 'Store';
import { SectionID } from 'Route/IndexPage/IndexPage';
import Icon from 'Component/Icon';
import Transition from 'Component/Transition';
import Settings from 'Component/Settings';
import './Navigation.module';

const NavigationMobile = memo(() => { // memo prevents unnecessary render which triggers animation
    const [isExpanded, setIsExpanded] = useState(false);
    const { currentSection, setScrollToSectionId } = useSection();
    const location = useLocation();
    const navigate = useNavigate();
    const transitionRef = useRef(null);

    const onNavigationItemClick = (e: GenericMouseEvent<HTMLAnchorElement, MouseEvent>, section: SectionID) => {
        e.preventDefault();
        setIsExpanded(false);

        if (!section) return;

        if (location.pathname === '/') {
            const _section = document.querySelector(`#${section}`) as HTMLElement;
            _section && scrollIntoView({ current: _section });
        }
        else {
            setScrollToSectionId(`#${section}`);
            navigate('/'); // Go back to index page, then after transition a callback will take care of scrolling
        }
    };

    useEffect(() => {
        document.querySelector('body')!.classList.toggle('disable-scrolling', isExpanded);
    }, [isExpanded]);

    const Menu = (
        isExpanded && (
            <Transition
                in
                appear
                timeout={{
                    enter: 200,
                    exit: 100
                }}
                nodeRef={transitionRef}
                classNames='Navigation-Mobile'
            >
                <div block='Navigation' elem='Mobile' ref={transitionRef}>
                    <div elem='Mobile-Menu'>
                        <nav elem='Nav'>
                            <h1 elem='MobileHeader'>
                                Menu
                            </h1>
                            <ul elem='List'>
                                {Object.values(SectionID).map((section) => (
                                    <li block='Navigation-ListItem' key={section}>
                                        <a
                                            role='button'
                                            onClick={(e) => onNavigationItemClick(e, section)}
                                            className={
                                                location.pathname === '/' && currentSection?.id.replace('#', '') === section
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            {section}
                                        </a>
                                    </li>
                                ))}
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