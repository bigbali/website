import {
    NavigationItemType,
} from './';
import NavigationLink from './NavigationLink';

export const NavigationItem = ({ label, name, to }: NavigationItemType) => {
    return (
        <li block='Navigation-ListItem' key={name}>
            <NavigationLink
                to={to}
                className={({ isActive }) => isActive ? 'active' : ''}
                name={name}
                onActiveReselected={(name, isMobile) => {
                    if (isMobile) { // On mobile, we want to reset the animation, and this is the approach
                        document.getElementById(name)!.classList.remove('active');

                        setTimeout(() => {
                            document.getElementById(name)!.classList.add('active');
                        }, 50);
                    }
                }}
            >
                {label}
            </NavigationLink>
        </li >
    );
};

export default NavigationItem;