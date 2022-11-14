import { useDevice } from 'Util';
import Navigation from 'Component/Navigation/';
import Settings from 'Component/Settings';
import './Header.style';
import NavigationLink from 'Component/Navigation/NavigationLink';

export const Header = () => {
    const { isDesktop } = useDevice();

    return (
        <div block='Header'>
            <NavigationLink to='/' elem='Branding'>
                balázs burján
            </NavigationLink>
            {isDesktop && <Settings.Desktop />}
            {!isDesktop && <Navigation.Mobile />}
        </div>
    );
};

export default Header;
