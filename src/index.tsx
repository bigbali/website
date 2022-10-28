import {
    StrictMode,
    useEffect,
    createRef
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
    useDevice,
    useNotification,
    useSettings
} from 'Util';
import store, { Theme } from 'Store';
import Header from 'Component/Header';
import Cookies from 'Component/Cookies';
import Notifications, {
    NotificationContextProvider,
    NotificationStatus
} from 'Component/Notifications';
import Transition from 'Component/Transition';
import Footer from 'Component/Footer';
import Page from 'Route';
import 'Style/main';

const rootElement = document.getElementById('root')!;
const body = document.querySelector('body')!;
const html = document.querySelector('html')!;

const routes = [
    {
        path: '/',
        element: <Page.Index />,
        nodeRef: createRef<any>()
    },
    {
        path: 'about',
        element: <Page.About />,
        nodeRef: createRef<any>()
    },
    {
        path: 'cookie-policy',
        element: <Page.CookiePolicy />,
        nodeRef: createRef<any>(),
    },
    {
        path: 'contact',
        element: <Page.Contact />,
        nodeRef: createRef<any>(),
    },
    {
        path: 'terms-of-use',
        element: <Page.TermsOfUse />,
        nodeRef: createRef<any>(),
    },
    {
        path: 'example/:id',
        element: <Page.Example />,
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
    const [showNotification] = useNotification();
    const { isMobile } = useDevice();
    const [{ theme, accentColor, fontSize, contrast }] = useSettings();
    const currentOutlet = useOutlet();
    const { nodeRef } = routes.find(
        (route) => route.path === location.pathname
    ) ?? {};

    useEffect(() => {
        showNotification({
            timeout: 5000,
            title: 'Hey',
            message: `We believe you are browsing this page from a ${isMobile ? 'mobile' : 'desktop'} device. That is very cool!`,
            status: NotificationStatus.INFO
        });
    }, [isMobile]);

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
            {/* <Footer /> */}
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
    <StrictMode>
        <Provider store={store}>
            <NotificationContextProvider>
                <RouterProvider router={router} />
            </NotificationContextProvider>
        </Provider>
    </StrictMode>
);

