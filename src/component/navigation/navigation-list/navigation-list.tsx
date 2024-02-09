import {
    memo,
    type MutableRefObject,
    type MouseEvent as GenericMouseEvent
} from 'react';
import Link from 'next/link';
import { SectionID } from '@store';

export type NavigationListProps = {
    pathname: string;
    currentSection: HTMLElement | null;
    previousSectionRef: MutableRefObject<SectionID | undefined>;
    onNavigationItemClick: (
        e: GenericMouseEvent<HTMLAnchorElement, MouseEvent>,
        section: SectionID
    ) => void;
    onNavigationItemClickEffect?: () => void;
};

const NavigationList = ({
    pathname,
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
                    data-interactable
                    onClick={(e) => {
                        if (onNavigationItemClickEffect) {
                            onNavigationItemClickEffect();
                        }

                        onNavigationItemClick(e, section);
                    }}
                    scroll={false}
                    href={''}
                    className={
                        pathname === '/' && currentSection?.id === section
                            ? 'active'
                            : ''.concat(
                                previousSectionRef?.current === section
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
);

export default memo(NavigationList);
