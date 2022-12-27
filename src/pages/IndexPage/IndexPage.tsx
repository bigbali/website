
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
import { useDevice } from 'Store';
import Transition from 'Component/Transition';
import SectionSelector from 'Component/SectionSelector';
import Icon from 'Component/Icon';
import Section from './Section';
import './IndexPage.module';

/**
 * Use this to refer to sections from other components
 */
export enum SectionID {
    LANDING = 'Landing',
    PROJECTS = 'Projects',
    ABOUT = 'About',
    CONTACT = 'Contact'
};

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

export const IndexPage = () => {
    const [areFontsLoaded, setAreFontsLoaded] = useState(false);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const areFontsLoadedRef = useRef(false);
    const loadingRef = useRef<HTMLDivElement>(null);
    const landingRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

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
                    <Transition timeout={500} classNames='IndexPage-Loading' unmountOnExit>
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