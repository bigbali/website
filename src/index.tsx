import {
    useEffect,
    createRef,
} from 'react';
import { createRoot } from 'react-dom/client';
import {
    useLocation,
    createBrowserRouter,
    RouterProvider,
    useOutlet,
} from 'react-router-dom';
import { SwitchTransition } from 'react-transition-group';
import {
    scrollIntoView
} from 'Util';
import {
    Theme,
    useSection,
    useSettings
} from 'Store';
import Header from 'Component/Header';
import Cookies from 'Component/Cookies';
import Notifications, {
    NotificationContextProvider
} from 'Component/Notifications';
import Transition from 'Component/Transition';
import Footer from 'Component/Footer';
import Page from 'Route';
import 'Style/main';

const rootElement = document.getElementById('root')!;
const body = document.querySelector('body')!;
const html = document.querySelector('html')!;

const observerAction: IntersectionObserverCallback = (elements) => {
    elements.forEach(element => {
        !element.target.getAnimations().length && element.target.classList.toggle('begin-animation', element.isIntersecting);
    });
};

const observer = new IntersectionObserver(observerAction, {
    root: null,
    rootMargin: '-80px 0px -80px 0px',
    threshold: [0.01, 0.99]
});

/**
 * This keeps track of observed elements so they can be accessed from other components
 */
const elementsToObserve = new Set();

export const updateElementsToObserve = (item: HTMLElement, remove = false) => {
    if (remove) {
        elementsToObserve.delete(item);
        observer.unobserve(item);
        return;
    }

    elementsToObserve.add(item);
    observer.observe(item);
};

const beginObservation = () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((element) => updateElementsToObserve(element as HTMLElement));
};

const afterTransitionCallback = (sectionId: string | null) => {
    if (!sectionId) return;

    beginObservation();

    const section = document.querySelector(sectionId) as HTMLElement;
    section && scrollIntoView({ current: section });
};

const routes = [
    {
        path: '/',
        element: <Page.Index />,
        nodeRef: createRef<any>()
    },
    {
        path: 'cookie-policy',
        element: <Page.CookiePolicy />,
        nodeRef: createRef<any>()
    },
    {
        path: 'project/:slug',
        element: <Page.Project />,
        nodeRef: createRef<any>()
    },
    {
        path: '*',
        element: <Page.NotFound />,
        nodeRef: createRef<any>()
    }
];

const Layout = () => {
    const location = useLocation();
    const { theme, accentColor, fontSize, contrast } = useSettings();
    const { scrollToSectionId } = useSection();
    const currentOutlet = useOutlet();
    const { nodeRef } = routes.find(
        (route) => route.path === location.pathname
    ) ?? {};

    useEffect(() => {
        beginObservation();
    }, [location]);

    useEffect(() => {
        if (theme === Theme.LIGHT) {
            body.classList.replace('theme-dark', 'theme-light') || body.classList.add('theme-light');
        }
        else {
            body.classList.replace('theme-light', 'theme-dark') || body.classList.add('theme-dark');
        }

        if (accentColor) {
            body.style.setProperty('--color-theme', accentColor.value);
        }
        else {
            body.style.removeProperty('--color-theme');
        }

        html.style.fontSize = `${(fontSize || 1)}em`;
        html.style.filter = `contrast(${contrast || 1})`;

    }, [theme, accentColor, fontSize, contrast]);

    return (
        <>
            <Header />
            <Notifications />
            <Cookies />
            {/* THIS BREAKS document.querySelector WHILE TRANSITIONING! */}
            <SwitchTransition>
                <Transition
                    key={location.key}
                    nodeRef={nodeRef}
                    classNames="cross-page"
                    timeout={{
                        enter: 300,
                        exit: 100
                    }} // when transition is done, scroll to section if given
                    onEntered={() => afterTransitionCallback(scrollToSectionId)}
                >
                    {() => (
                        <main ref={nodeRef} block='Page'>
                            {currentOutlet}
                        </main>
                    )}
                </Transition>
            </SwitchTransition>
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        // if an error occurs in the layout, this will catch that...
        errorElement: <Page.Error />,
        element: <Layout />,
        children: [
            { // ... and if it happens lower in the tree, this will catch that while keeping the layout
                errorElement: <Page.Error />,
                children: routes.map(
                    route => ({
                        index: route.path === '/',
                        path: route.path === '/' ? undefined : route.path,
                        element: route.element
                    })
                )
            }
        ]
    }
]);

const root = createRoot(rootElement);
root.render(
    <NotificationContextProvider>
        <RouterProvider router={router} />
    </NotificationContextProvider>
);

