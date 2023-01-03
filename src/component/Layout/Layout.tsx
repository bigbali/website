import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Header from 'Component/Header';
import Footer from 'Component/Footer';
import Notifications from 'Component/Notifications';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const Cookies = dynamic(() => import('Component/Cookies') as any, {
    ssr: false
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
// const Notifications = dynamic(() => import('Component/Notifications') as any, {
//     ssr: false
// });

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
