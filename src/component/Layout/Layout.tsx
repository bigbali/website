import { type ReactNode } from 'react';
import Header from 'Component/Header';
import Footer from 'Component/Footer';

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main className='Page'>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
