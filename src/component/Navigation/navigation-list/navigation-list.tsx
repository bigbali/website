import {
    memo,
    type MouseEvent as GenericMouseEvent,
    type RefObject
} from 'react';
import Link from 'next/link';
import { SectionID } from 'Store';

export type NavigationListProps = {
    asPath: string,
    currentSection: HTMLElement,
    previousSectionRef: RefObject<SectionID>,
    onNavigationItemClick: (e: GenericMouseEvent<HTMLAnchorElement, MouseEvent>, section: SectionID) => void,
    onNavigationItemClickEffect?: () => void
};

const NavigationList = ({
    asPath,
    currentSection,
    previousSectionRef,
    onNavigationItemClick,
    onNavigationItemClickEffect
}: NavigationListProps) => (
    <ul block='Navigation' elem='List'>
        {Object.values(SectionID).map((section) => (
            <li block='Navigation' elem='ListItem' key={section}>
                <Link
                    role='button'
                    title={`Scroll to ${section} section`}
                    onClick={(e) => {
                        if (onNavigationItemClickEffect) {
                            onNavigationItemClickEffect();
                        }

                        onNavigationItemClick(e, section);
                    }}
                    scroll={false}
                    href={''}
                    className={
                        (asPath === '/' && currentSection?.id === section)
                            ? 'active'
                            : ''.concat(
                                previousSectionRef?.current === section
                                    ? 'previouslyactive'
                                    : ''
                            )}
                >
                    {section}
                </Link>
            </li>
        ))}
    </ul>
);

export default memo(NavigationList);