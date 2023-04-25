import { type NavigationElementProps } from '../navigation';
import NavigationList from '../navigation-list';
import './navigation-desktop.style';

const NavigationDesktop = ({ listProps }: NavigationElementProps) => {
    return <NavigationList {...listProps} />;
};

export default NavigationDesktop;