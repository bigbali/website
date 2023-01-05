import { type ReactNode } from 'react';
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

type LayoutProps = {
    children: ReactNode
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main className='Page'>
                {children}
            </main>
            <Footer />
            <Cookies />
            <Notifications />
        </>
    );
};

export default Layout;
