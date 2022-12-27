import create from 'zustand';
import { isClient } from 'Util';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

export enum DefaultColorValue {
    GREEN = '#008000',
    BLUE = '#1b6099',
    PURPLE = '#870c87',
    YELLOW = '#e0af00'
}

export const DefaultColors = {
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

export type ColorType = {
    name: string,
    value: DefaultColorValue | string
};

export type Color = ColorType | null;

export interface Settings {
    theme: Theme,
    accentColor: Color | null,
    fontSize: number,
    contrast: number
};

interface SettingsStore extends Settings {
    setTheme: (theme: Theme) => void,
    setAccentColor: (accentColor: Color) => void,
    setFontSize: (fontSize: number) => void,
    setContrast: (contrast: number) => void,
    reset: () => void
};

const isOsThemeDark = isClient && window.matchMedia('(prefers-color-scheme: dark)').matches;
export const defaultSettings: Settings = {
    theme: isOsThemeDark ? Theme.DARK : Theme.LIGHT,
    accentColor: null,
    fontSize: 1,
    contrast: 1
};

const storedStateJSON = isClient && localStorage.getItem('settings');
const storedSettings: Settings | null = (storedStateJSON && JSON.parse(storedStateJSON)) || null;
const initialState: Settings = storedSettings || defaultSettings;

const updateStoredState = (partialState: Partial<SettingsStore>) => {
    const {
        theme,
        accentColor,
        fontSize,
        contrast
    } = useSettings.getState();
    localStorage.setItem('settings', JSON.stringify({
        theme,
        accentColor,
        fontSize,
        contrast,
        ...partialState
    }));
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
                contrast: defaultSettings.contrast,
            };
        });
    }
}));

export default useSettings;

