import {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { TransitionGroup } from 'react-transition-group';
import FontFaceObserver from 'fontfaceobserver';
import { scrollIntoView } from '@util';
import { SectionID, useDevice, useSection } from '@store';
import Transition from '@component/transition';
import SectionSelector from '@component/section-selector';
import Icon from '@component/icon';
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
    const setScrollToSectionId = useSection((state) => state.setScrollToSectionId);

    const isDesktop = useDevice(state => state.isDesktop);

    // Without useCallback, we get a hydration error, believe it or not
    const onFontsLoaded = useCallback(() => {
        areFontsLoadedRef.current = true;
        setAreFontsLoaded(true);
    }, []);
    const setSplineLoaded = useCallback(() => setIsSplineLoaded(true), []);
    const onTransitionExited = () => {
        scrollToSection(scrollToSectionId);

        // We need to forget the section id, otherwise we will scroll to it
        // when the page is loaded again
        setScrollToSectionId(null);
    };

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
            console.log('Fonts are ready in', `${Math.round(performance.now())}ms.`);
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

            <Section.Landing
                isSplineLoaded={isSplineLoaded}
                setSplineLoaded={setSplineLoaded}
                // loadingRef={loadingRef}
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

export default memo(IndexPage);