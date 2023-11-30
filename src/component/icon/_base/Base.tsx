import { DetailedHTMLProps, HTMLAttributes } from 'react';
import './Base.style';

type Mods = string | Record<string, any>;

export type IconBaseProps = {
    icon: string;
    modifiers?: Mods;
};

export type IconBase = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'className'
> &
    IconBaseProps;

const EMPTY = '';

// We can't use the babel plugin to transform our blocks, elems and mods, so we do it ourselves
const buildIconModifiers = (base: string, mods?: Mods): string => {
    if (!mods) return EMPTY;
    if (typeof mods === 'string') return ` ${base}_${mods}`;

    return Object.entries(mods)
        .map(([key, value]) => {
            if (value) return ` ${base}_${key}`;
        })
        .join(' ');
};

export const Base = ({ children, icon, modifiers, ...props }: IconBase) => {
    const iconName = `Icon-${icon}`;
    const iconMods = buildIconModifiers(iconName, modifiers);

    return (
        <div className={`Icon Icon-${icon}${iconMods}`} {...props}>
            {children}
        </div>
    );
};

export default Base;
