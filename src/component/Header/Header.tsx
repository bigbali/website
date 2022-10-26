import { useDevice } from 'Util';
import Navigation from 'Component/Navigation/';
import Settings from 'Component/Settings';
import './Header.style';

export const Header = () => {
    const { isDesktop } = useDevice();

    return (
        <div block='Header'>
            <h1 elem='Branding'>
                balázs burján
            </h1>
            {isDesktop
                ? <Navigation.Desktop />
                : <Navigation.Mobile />}
            {isDesktop && <Settings.Desktop />}
        </div>
    );
};

export default Header;
