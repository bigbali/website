import { useSelector } from 'Util';
import store, {
    Color,
    settingsSlice,
    type Theme
} from 'Store';

export const useSettings = () => {
    const settings = useSelector(state => state.settings);
    const actions = {
        setTheme: (theme: Theme) => store.dispatch(settingsSlice.actions.setTheme(theme)),
        setAccentColor: (color: Color) => store.dispatch(settingsSlice.actions.setAccentColor(color)),
        setFontSize: (modifier: number) => store.dispatch(settingsSlice.actions.setFontSize(modifier)),
        setContrast: (modifier: number) => store.dispatch(settingsSlice.actions.setContrast(modifier)),
        reset: () => store.dispatch(settingsSlice.actions.reset())
    };

    return [settings, actions] as const;
};

export default useSettings;