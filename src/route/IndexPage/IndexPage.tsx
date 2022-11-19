
import {
    RefObject,
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react';
import { TransitionGroup } from 'react-transition-group';
import Transition from 'Component/Transition';
import SectionSelector from 'Component/SectionSelector';
import Section from './Section';
import './IndexPage.style';

const scrollIntoView = (section: RefObject<HTMLElement>) => {
    // 10rem represented as integer
    const topOffset = Number.parseInt(getComputedStyle(document.body).fontSize.replace('px', '')) * 10;
    const sectionOffset = section.current?.offsetTop || 0;

    window.scrollTo({
        top: sectionOffset - topOffset,
        behavior: 'smooth'
    });
};

export const IndexPage = () => {
    const [areFontsLoaded, setAreFontsLoaded] = useState(false);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const loadingRef = useRef<HTMLDivElement>(null);
    const landingRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const onFontsLoaded = useCallback(
        () => setAreFontsLoaded(true),
        []
    );
    const onSplineLoaded = useCallback(
        () => setIsSplineLoaded(true),
        []
    );

    const Sections = useMemo(() => [
        {
            label: 'Landing',
            ref: landingRef
        },
        {
            label: 'Projects',
            ref: projectsRef
        },
        {
            label: 'About',
            ref: aboutRef
        },
        {
            label: 'Contact',
            ref: contactRef
        },
    ], []);

    return (
        <div block='IndexPage'>
            <TransitionGroup component={null}>
                {(!areFontsLoaded || !isSplineLoaded) && (
                    <Transition timeout={500} classNames='IndexPage-Loading'>
                        <div block='IndexPage' elem='Loading' mods={{ FONTS_READY: areFontsLoaded }}>
                            {/* <div className='Loader' />
                            <span>
                                balázs burján
                            </span> */}
                        </div>
                    </Transition>
                )}
            </TransitionGroup>
            <Section.Landing
                onFontsLoaded={onFontsLoaded}
                onSplineLoaded={onSplineLoaded}
                loadingRef={loadingRef}
                refFromParent={landingRef}
            />
            <Section.Projects refFromParent={projectsRef} />
            <Section.About refFromParent={aboutRef} />
            <Section.Contact refFromParent={contactRef} />
            <SectionSelector
                sections={Sections}
                onSelect={scrollIntoView}
            />
        </div>
    );
};

export default IndexPage;