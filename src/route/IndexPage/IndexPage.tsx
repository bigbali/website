
import {
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react';
import { TransitionGroup } from 'react-transition-group';
import { scrollIntoView } from 'Util';
import Transition from 'Component/Transition';
import SectionSelector from 'Component/SectionSelector';
import Section from './Section';
import './IndexPage.style';

/**
 * Use this to refer to sections from other components
 */
export enum SectionID {
    LANDING = 'Landing',
    PROJECTS = 'Projects',
    ABOUT = 'About',
    CONTACT = 'Contact'
};

export const IndexPage = () => {
    const [areFontsLoaded, setAreFontsLoaded] = useState(false);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const loadingRef = useRef<HTMLDivElement>(null);
    const landingRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    // onSplineUnloaded when changing theme?

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
            label: SectionID.LANDING,
            ref: landingRef
        },
        {
            label: SectionID.PROJECTS,
            ref: projectsRef
        },
        {
            label: SectionID.ABOUT,
            ref: aboutRef
        },
        {
            label: SectionID.CONTACT,
            ref: contactRef
        },
    ], []);

    return (
        <div block='IndexPage'>
            <TransitionGroup component={null}>
                {(!areFontsLoaded || !isSplineLoaded) && (
                    <Transition timeout={500} classNames='IndexPage-Loading' unmountOnExit>
                        <div block='IndexPage' elem='Loading' mods={{ FONTS_READY: areFontsLoaded }}>
                            {/* <div className='Loader' />
                            <span>
                                balázs burján
                            </span> */}
                            {/* {(() => { throw Error(); })()} */}
                        </div>
                    </Transition>
                )}
            </TransitionGroup>
            <Section.Landing
                onFontsLoaded={onFontsLoaded}
                onSplineLoaded={onSplineLoaded}
                shouldTriggerAnimation={areFontsLoaded && isSplineLoaded}
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