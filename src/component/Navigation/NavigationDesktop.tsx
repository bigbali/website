import { navigationMap } from './';
import NavigationItem from './NavigationItem';
import './Navigation.style';

const NavigationDesktop = () => (
    <nav block='Navigation'>
        <ul elem='List'>
            {navigationMap.map(NavigationItem)}
        </ul>
    </nav>
);

export default NavigationDesktop;