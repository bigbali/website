import Link from 'next/link';
import NavigationLink from './NavigationLink';
import {
    type NavigationItemType,
} from './';

export const NavigationItem = ({ label, name, to }: NavigationItemType) => {
    return (
        <li block='Navigation-ListItem' key={name}>
            {/* <NavigationLink
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
            </NavigationLink> */}
            <Link href={to} title={name}>
                {label}
            </Link>
        </li >
    );
};

export default NavigationItem;