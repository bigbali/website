import {
    useEffect,
    useRef,
    type MouseEvent as GenericMouseEvent
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSection } from 'Store';
import { scrollIntoView } from 'Util';
import { SectionID } from 'Route/IndexPage/IndexPage';
import './Navigation.style';

const NavigationDesktop = () => {
    const { currentSection, setScrollToSectionId } = useSection();
    const previousRef = useRef<SectionID>();
    const location = useLocation();
    const navigate = useNavigate();

    const onNavigationItemClick = (e: GenericMouseEvent<HTMLAnchorElement, MouseEvent>, section: SectionID) => {
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
        previousRef.current = currentSection?.id as SectionID || SectionID.LANDING;
    }, [currentSection?.id]);

    return (
        <nav block='Navigation'>
            <ul elem='List'>
                {Object.values(SectionID).map((section) => (
                    <li block='Navigation-ListItem' key={section}>
                        <a
                            title={`Scroll to ${section} section`}
                            onClick={(e) => onNavigationItemClick(e, section)}
                            className={
                                location.pathname === '/' && currentSection?.id.replace('#', '') === section
                                    ? 'active'
                                    : ''.concat(previousRef.current === section ? 'previouslyactive' : '')
                            }
                        >
                            {section}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationDesktop;