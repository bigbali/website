import React, {
    memo,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    type MouseEvent as GenericMouseEvent
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SectionID, useSection } from 'Store';
import { scrollIntoView } from 'Util';
import NavigationDesktop from './navigation-desktop';
import NavigationMobile from './navigation-mobile';

export type NavigationProps = {
    isMobile?: boolean
};

export type NavigationElementProps = {
    NavigationList: ReactElement
};

const Navigation = ({ isMobile }: NavigationProps) => {
    const currentSection = useSection(state => state.currentSection);
    const setScrollToSectionId = useSection(state => state.setScrollToSectionId);

    const { asPath, push } = useRouter();
    const previousSectionRef = useRef<SectionID>();

    const onNavigationItemClick = useCallback((e: GenericMouseEvent<HTMLAnchorElement, MouseEvent>, section: SectionID) => {
        if (!section) return;
        e.preventDefault();

        if (asPath === '/') {
            const _section = document.querySelector(`#${section}`) as HTMLElement;
            _section && scrollIntoView({ current: _section });
        }
        else {
            setScrollToSectionId(`#${section}`);
            void push('/'); // Go back to index page, then after transition a callback will take care of scrolling
        }
    }, [asPath]);

    const NavigationList = useMemo(() => (
        <ul block='Navigation' elem='List'>
            {Object.values(SectionID).map((section) => (
                <li block='Navigation' elem='ListItem' key={section}>
                    <Link
                        role='button'
                        title={`Scroll to ${section} section`}
                        onClick={(e) => onNavigationItemClick(e, section)}
                        scroll={false}
                        href={''}
                        className={
                            (asPath === '/' && currentSection?.id === section)
                                ? 'active'
                                : ''.concat(
                                    previousSectionRef.current === section
                                        ? 'previouslyactive'
                                        : ''
                                )
                        }
                    >
                        {section}
                    </Link>
                </li>
            ))}
        </ul>
    ), [asPath, currentSection, previousSectionRef.current]);

    useEffect(() => {
        previousSectionRef.current = currentSection?.id as SectionID || SectionID.LANDING;
    }, [currentSection?.id]);

    return (
        <nav block='Navigation' mods={{ MOBILE: isMobile, DESKTOP: !isMobile }}>
            {
                isMobile
                    ? <NavigationMobile NavigationList={NavigationList} />
                    : <NavigationDesktop NavigationList={NavigationList} />
            }
        </nav>
    );
};

export default memo(Navigation);