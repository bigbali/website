import React, {
    memo,
    useCallback,
    useEffect,
    useRef,
    type MouseEvent as GenericMouseEvent
} from 'react';
import { useRouter } from 'next/router';
import { SectionID, useSection } from '@store';
import { scrollIntoView } from '@util';
import {
    type NavigationListProps
} from './navigation-list';
import NavigationDesktop from './navigation-desktop';
import NavigationMobile from './navigation-mobile';

export type NavigationProps = {
    isMobile?: boolean
};

export type NavigationElementProps = {
    listProps: NavigationListProps
};

const Navigation = ({ isMobile }: NavigationProps) => {
    const currentSection = useSection(state => state.currentSection);
    const setScrollToSectionId = useSection(state => state.setScrollToSectionId);

    // FIXME should replace all asPath with pathname
    const { pathname: asPath, push } = useRouter();
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

    useEffect(() => {
        previousSectionRef.current = currentSection?.id as SectionID || SectionID.LANDING;
    }, [currentSection?.id]);

    return (
        <nav block='Navigation' mods={{ MOBILE: isMobile, DESKTOP: !isMobile }}>
            {
                isMobile
                    ? <NavigationMobile listProps={{
                        asPath,
                        currentSection,
                        previousSectionRef,
                        onNavigationItemClick
                    }} />
                    : <NavigationDesktop listProps={{
                        asPath,
                        currentSection,
                        previousSectionRef,
                        onNavigationItemClick
                    }} />
            }
        </nav>
    );
};

export default memo(Navigation);