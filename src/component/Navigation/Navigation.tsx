import React, {
    memo,
    useEffect,
    useRef,
    useState,
    type MouseEvent as GenericMouseEvent
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TransitionGroup } from 'react-transition-group';
import { SectionID, useSection } from 'Store';
import { scrollIntoView } from 'Util';
import Icon from 'Component/Icon';
import Transition from 'Component/Transition';
import Settings from 'Component/Settings';
import './Navigation.style';

type NavigationProps = {
    isMobile?: boolean
};

const Navigation = ({ isMobile }: NavigationProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { currentSection, setScrollToSectionId } = useSection();
    const { pathname, push } = useRouter();
    const previousRef = useRef<SectionID>();
    const transitionRef = useRef();

    const onNavigationItemClick = (e: GenericMouseEvent<HTMLAnchorElement, MouseEvent>, section: SectionID) => {
        if (!section) return;
        e.preventDefault();

        if (pathname === '/') {
            const _section = document.querySelector(`#${section}`) as HTMLElement;
            _section && scrollIntoView({ current: _section });
        }
        else {
            setScrollToSectionId(`#${section}`);
            void push('/'); // Go back to index page, then after transition a callback will take care of scrolling
        }
    };

    useEffect(() => {
        previousRef.current = currentSection?.id as SectionID || SectionID.LANDING;
    }, [currentSection?.id]);

    const NavigationMenu = (
        <nav block='Navigation'>
            {isMobile && (
                <h1 block='Navigation' elem='MobileHeader'>
                    Menu
                </h1>
            )}
            <ul elem='List'>
                {Object.values(SectionID).map((section) => (
                    <li block='Navigation-ListItem' key={section}>
                        <Link
                            role='button'
                            title={`Scroll to ${section} section`}
                            onClick={(e) => onNavigationItemClick(e, section)}
                            scroll={false}
                            href={''}
                            className={
                                pathname === '/' && currentSection?.id === section
                                    ? 'active'
                                    : ''.concat(previousRef.current === section ? 'previouslyactive' : '')
                            }
                        >
                            {section}
                        </Link>
                    </li>
                ))}
            </ul>
            {isMobile && (
                <div block='Navigation' elem='Settings'>
                    <Settings isMobile />
                </div>
            )}
        </nav>
    );

    if (!isMobile) {
        return NavigationMenu;
    }

    return (
        <TransitionGroup component={null}>
            <div
                block='Navigation'
                elem='HamburgerIconWrapper'
                onClick={() => setIsExpanded((state) => !state)}
            >
                <Icon.HamburgerMenu isExpanded={isExpanded} />
            </div>
            {isExpanded && (
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
                    {NavigationMenu}
                </Transition>
            )}
        </TransitionGroup>
    );
};

export default memo(Navigation);