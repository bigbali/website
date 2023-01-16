import {
    forwardRef,
    type PropsWithChildren,
} from 'react';
import dynamic from 'next/dynamic';
import Footer from 'Component/Footer';

const Header = dynamic(() => import('Component/Header'), {
    ssr: false
});

const Cookies = dynamic(() => import('Component/Cookies'), {
    ssr: false
});

const Notifications = dynamic(() => import('Component/Notifications'), {
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
