
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { TransitionGroup } from 'react-transition-group';
import FontFaceObserver from 'fontfaceobserver';
import { scrollIntoView } from 'Util';
import { SectionID, useDevice, useSection } from 'Store';
import Transition from 'Component/Transition';
import SectionSelector from 'Component/SectionSelector';
import Icon from 'Component/Icon';
import Section from './section';
import './index-page.style';

const fontsReady = async () => {
    const raleway = new FontFaceObserver('Raleway');
    const caveat = new FontFaceObserver('Caveat');

    await raleway.load().catch(() => {
        console.warn('Font load timed out: Raleway.');
    });
    await caveat.load().catch(() => {
        console.warn('Font load timed out: Caveat.');
    });
};

const scrollToSection = (id: string | null) => {
    if (!id) return;
    const section = document.querySelector(id);
    section && scrollIntoView({ current: section as HTMLElement });
};

export const IndexPage = () => {
    const [areFontsLoaded, setAreFontsLoaded] = useState(false);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const areFontsLoadedRef = useRef(false);
    const loadingRef = useRef<HTMLDivElement>(null);
    const landingRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);
    const scrollToSectionId = useSection((state) => state.scrollToSectionId);

    const { isDesktop } = useDevice();

    const onFontsLoaded = useCallback(() => {
        areFontsLoadedRef.current = true;
        setAreFontsLoaded(true);
    }, []);
    const onSplineLoaded = useCallback(() => setIsSplineLoaded(true), []);

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

    // handle font loading
    // (we wait here only; on other pages we don't wait for fonts)
    useEffect(() => {
        void (async () => {
            await fontsReady();
            onFontsLoaded();
            console.log('Fonts are ready.', `${Math.round(performance.now())}ms`);
        })();

        const timeout = setTimeout(() => {
            if (!areFontsLoadedRef.current) {
                console.warn('Couldn\'t load fonts in time. Exiting loading interface. Text may flicker when fonts finally load.');
                setAreFontsLoaded(true);
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div block='IndexPage'>
            <TransitionGroup component={null}>
                {(!areFontsLoaded || !isSplineLoaded) && (
                    <Transition
                        timeout={500}
                        unmountOnExit
                        onExited={() => scrollToSection(scrollToSectionId)}
                        classNames='IndexPage-Loading'
                    >
                        <div block='IndexPage' elem='Loading'>
                            <div elem='Loading-Logo'>
                                <Icon.BB />
                            </div>
                            {/* fonts will be loaded by the time JavaScript is run, but better safe than sorry */}
                            {!areFontsLoaded || !isSplineLoaded && (
                                <div className='loader'>
                                    {!areFontsLoaded && (
                                        <span>
                                            Loading fonts
                                            <Icon.Loader />
                                        </span>
                                    )}
                                    {!isSplineLoaded && isDesktop && (
                                        <span>
                                            Loading 3D animation
                                            <Icon.Loader />
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </Transition>
                )}
            </TransitionGroup>
            <Section.Landing
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