import NavigationDesktop from './NavigationDesktop';
import NavigationItem from './NavigationItem';
import NavigationLink from './NavigationLink';
import NavigationMobile from './NavigationMobile';

export type NavigationItemType = {
    label: string,
    name: string,
    to: string
};

export const navigationMap: NavigationItemType[] = [
    {
        label: 'home',
        name: 'index',
        to: '/'
    },
    {
        label: 'about',
        name: 'about',
        to: '/about'
    },
    {
        label: 'contact',
        name: 'contact',
        to: '/contact'
    }
];

const Navigation = {
    Desktop: NavigationDesktop,
    Mobile: NavigationMobile,
    Link: NavigationLink,
    Item: NavigationItem
};

export default Navigation;