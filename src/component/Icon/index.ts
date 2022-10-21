export * from './Chevron';

import { default as Base } from './Base';
import { default as Close } from './Close';
import { default as Chevron } from './Chevron';
import { default as HamburgerMenu } from './HamburgerMenu';
import { default as Settings } from './Settings';
import { default as Sun } from './Sun';
import { default as Moon } from './Moon';

const Icon = {
    Base,
    Close,
    Chevron,
    HamburgerMenu,
    Settings,
    Sun,
    Moon
};

export default Icon;
export interface IconProps {
    color?: string
}
