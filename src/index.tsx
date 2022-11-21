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
import { Provider } from 'react-redux';
import { SwitchTransition } from 'react-transition-group';
import {
    useSettings
} from 'Util';
import store, { Theme } from 'Store';
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

const routes = [
    {
        path: '/',
        element: <Page.Index />,
        nodeRef: createRef<any>()
    },
    {
        path: 'cookie-policy',
        element: <Page.CookiePolicy />,
        nodeRef: createRef<any>(),
    },
    {
        path: 'project/:slug',
        element: <Page.Project />,
        nodeRef: createRef<any>(),
    },
    {
        path: '*',
        element: <Page.NotFound />,
        nodeRef: createRef<any>(),
    }
];

const Layout = () => {
    const location = useLocation();
    const [{ theme, accentColor, fontSize, contrast }] = useSettings();
    const currentOutlet = useOutlet();
    const { nodeRef } = routes.find(
        (route) => route.path === location.pathname
    ) ?? {};

    useEffect(() => { // scroll animations
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        elementsToAnimate.forEach((element) => updateElementsToObserve(element as HTMLElement));
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
            <SwitchTransition>
                <Transition
                    key={location.key}
                    nodeRef={nodeRef}
                    classNames="cross-page"
                    timeout={{
                        enter: 300,
                        exit: 100
                    }}>
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
        element: <Layout />,
        children: [
            { // this is our error boundary
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
    <Provider store={store}>
        <NotificationContextProvider>
            <RouterProvider router={router} />
        </NotificationContextProvider>
    </Provider>
);

