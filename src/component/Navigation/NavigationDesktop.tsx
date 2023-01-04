import {
    useEffect,
    useRef,
    type MouseEvent as GenericMouseEvent
} from 'react';
import { useSection } from 'Store';
import { scrollIntoView } from 'Util';
import { SectionID } from 'Component/_page/index-page/index-page';
import { useRouter } from 'next/router';
import Link from 'next/link';
import './Navigation.style';

const NavigationDesktop = () => {
    const { currentSection, setScrollToSectionId } = useSection();
    const { pathname, push } = useRouter();
    const previousRef = useRef<SectionID>();

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

    return (
        <nav block='Navigation'>
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
        </nav>
    );
};

export default NavigationDesktop;