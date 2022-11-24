import { useDevice } from 'Util';
import Navigation from 'Component/Navigation/';
import Settings from 'Component/Settings';
import './Header.style';

export const Header = () => {
    const { isDesktop } = useDevice();

    return (
        <div block='Header'>
            <a href='/' elem='Branding'>
                balázs burján
            </a>
            {isDesktop && <Settings.Desktop />}
            {!isDesktop && <Navigation.Mobile />}
        </div>
    );
};

export default Header;
