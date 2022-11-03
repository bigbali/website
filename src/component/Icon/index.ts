export * from './Chevron';

import { default as Base } from './Base';
import { default as Address } from './Address';
import { default as Anchor } from './Anchor';
import { default as Cat } from './Cat';
import { default as Close } from './Close';
import { default as Chevron } from './Chevron';
import { default as GitHub } from './GitHub';
import { default as HamburgerMenu } from './HamburgerMenu';
import { default as Location } from './Location';
import { default as Settings } from './Settings';
import { default as Sun } from './Sun';
import { default as Moon } from './Moon';

const Icon = {
    Base,
    Address,
    Anchor,
    Cat,
    Close,
    Chevron,
    GitHub,
    HamburgerMenu,
    Location,
    Settings,
    Sun,
    Moon
};

export default Icon;
export interface IconProps {
    color?: string
}
