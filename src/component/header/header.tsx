import { useDevice } from '@store';
import Navigation from '@component/navigation';
import Settings from '@component/settings';
import Link from 'next/link';
import './header.style';

export const Header = () => {
    const isDesktop = useDevice((state) => state.isDesktop);
    const isMobile = useDevice((state) => state.isMobile);

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
