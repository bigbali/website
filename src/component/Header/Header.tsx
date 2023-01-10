import { useDevice } from 'Store';
import Navigation from 'Component/Navigation/';
import Settings from 'Component/Settings';
import Link from 'next/link';
import './Header.style';

export const Header = () => {
    const { isDesktop, isMobile } = useDevice();

    return (
        <div block='Header'>
            <Link href='/' elem='Branding'>
                balázs burján
            </Link>
            {isDesktop && (
                <>
                    <Navigation />
                    <Settings />
                </>
            )}
            {isMobile && <Navigation isMobile />}
        </div>
    );
};

export default Header;
