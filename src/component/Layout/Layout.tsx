import {
    forwardRef,
    type PropsWithChildren,
} from 'react';
import dynamic from 'next/dynamic';
import Footer from '@component/footer';

const Header = dynamic(() => import('@component/header'), {
    ssr: false
});

const Cookies = dynamic(() => import('@component/cookies'), {
    ssr: false
});

const Notifications = dynamic(() => import('@component/notifications'), {
    ssr: false
});

const Layout = forwardRef<HTMLElement, PropsWithChildren>(({ children }, ref) => {
    return (
        <>
            <Header />
            <main className='Page' ref={ref}>
                {children}
            </main>
            <Footer />
            <Cookies />
            <Notifications />
        </>
    );
});

export default Layout;
