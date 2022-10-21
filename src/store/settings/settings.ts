import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}


const isOsThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
export const defaultSettings: Settings = {
    theme: isOsThemeDark ? Theme.DARK : Theme.LIGHT,
    accentColor: null,
    fontSize: 1,
    contrast: 1
};

const storedStateJSON = localStorage.getItem('settings');
const storedSettings: Settings | null = (storedStateJSON && JSON.parse(storedStateJSON)) || null;
const initialState: Settings = storedSettings || defaultSettings;

const updateStoredState = (state: Settings) => {
    localStorage.setItem('settings', JSON.stringify(state));
};
const resetStoredState = () => {
    localStorage.removeItem('settings');
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, { payload }: PayloadAction<Theme>) => {
            state.theme = payload;
            updateStoredState(state);
        },
        setAccentColor: (state, { payload }: PayloadAction<Color>) => {
            state.accentColor = payload;
            updateStoredState(state);
        },
        setFontSize: (state, { payload }: PayloadAction<number>) => {
            state.fontSize = payload;
            updateStoredState(state);
        },
        setContrast: (state, { payload }: PayloadAction<number>) => {
            state.contrast = payload;
            updateStoredState(state);
        },
        reset: (state) => {
            state.theme = defaultSettings.theme;
            state.accentColor = defaultSettings.accentColor;
            state.fontSize = defaultSettings.fontSize;
            state.contrast = defaultSettings.contrast;

            resetStoredState();
        }
    }
});

export default settingsSlice;