import { create } from 'zustand';
import { isClient } from '@util';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

export enum DefaultColorValue {
    RED = 'hsl(0, 83.78%, 43.53%)',
    GREEN = 'hsl(120, 100%, 25.1%)',
    BLUE = 'hsl(207.14, 70%, 35.29%)',
    PURPLE = 'hsl(300, 83.67%, 28.82%)',
    YELLOW = 'hsl(46.88, 100%, 43.92%)'
}

export const DefaultColors = {
    RED: {
        name: 'Red',
        value: DefaultColorValue.RED
    },
    BLUE: {
        name: 'Blue',
        value: DefaultColorValue.BLUE
    },
    GREEN: {
        name: 'Green',
        value: DefaultColorValue.GREEN
    },
    PURPLE: {
        name: 'Purple',
        value: DefaultColorValue.PURPLE
    },
    YELLOW: {
        name: 'Yellow',
        value: DefaultColorValue.YELLOW
    }
};

export type Color = {
    name: string;
    value: DefaultColorValue | string;
};

export type Settings = {
    theme: Theme;
    accentColor: Color;
    fontSize: number;
    contrast: number;
};

interface SettingsStore extends Settings {
    setTheme: (theme: Theme) => void;
    setAccentColor: (accentColor: Color) => void;
    setFontSize: (fontSize: number) => void;
    setContrast: (contrast: number) => void;
    reset: () => void;
}

const isOsThemeDark =
    isClient && window.matchMedia('(prefers-color-scheme: dark)').matches;
export const defaultSettings: Settings = {
    theme: isOsThemeDark ? Theme.DARK : Theme.LIGHT,
    accentColor: DefaultColors.RED,
    fontSize: 1,
    contrast: 1
};

const storedStateJSON = isClient && localStorage.getItem('settings');
const storedSettings: Settings | null =
    (storedStateJSON && JSON.parse(storedStateJSON)) || null;
const initialState: Settings = storedSettings || defaultSettings;

const updateStoredState = (partialState: Partial<SettingsStore>) => {
    const { theme, accentColor, fontSize, contrast } = useSettings.getState();
    localStorage.setItem(
        'settings',
        JSON.stringify({
            theme,
            accentColor,
            fontSize,
            contrast,
            ...partialState
        })
    );
};
const resetStoredState = () => {
    localStorage.removeItem('settings');
};

const setFunction = (value: Partial<Settings>) => {
    updateStoredState(value);
    return value;
};

export const useSettings = create<SettingsStore>((set) => ({
    ...initialState,
    setTheme: (theme) => {
        set(() => setFunction({ theme }));
    },
    setAccentColor: (accentColor) => {
        set(() => setFunction({ accentColor }));
    },
    setFontSize: (fontSize) => {
        set(() => setFunction({ fontSize }));
    },
    setContrast: (contrast) => {
        set(() => setFunction({ contrast }));
    },
    reset: () => {
        set(() => {
            resetStoredState();

            return {
                theme: defaultSettings.theme,
                accentColor: defaultSettings.accentColor,
                fontSize: defaultSettings.fontSize,
                contrast: defaultSettings.contrast
            };
        });
    }
}));

export default useSettings;
