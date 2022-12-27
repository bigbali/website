import {
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react';
import lodash from 'lodash';
import { useClickOutside } from 'Util';
import {
    Color,
    DefaultColors,
    Theme,
    useSettings
} from 'Store';
import Switch from 'Component/Switch';
import Slider from 'Component/Slider';
import Icon from 'Component/Icon';
import './Settings.module';

const ColorMap = [
    null,
    ...Object.values(DefaultColors)
];

export const SettingsDesktop = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        theme,
        accentColor,
        fontSize,
        contrast,
        setTheme,
        setAccentColor,
        setFontSize,
        setContrast,
        reset
    } = useSettings();
    const ref = useRef(null);

    useClickOutside(ref, (isExpanded) => isExpanded && setIsExpanded(false));

    const handleThemeSwitch = (theme: Theme) => {
        setTheme(theme);
    };

    const handleChangeAccentColor = (color: Color) => {
        setAccentColor(color);
    };

    const handleChangeFontSize = useMemo(() => {
        return lodash.debounce((modifier: number) => setFontSize(modifier), 300);
    }, []);

    const handleChangeContrast = (modifier: number) => {
        setContrast(modifier);
    };

    const getOutlineStyle = useCallback((color: Color) => { // when we have the default selected, null === null,
        if (accentColor === color           // but when we select another color, that is an object,
            || (color && accentColor        // therefore between page reloads their reference will change
                && (color.value === accentColor.value))) { // -> so we compare their values, not their references
            return `4px solid ${getComputedStyle(document.body)
                .getPropertyValue(`--color-border-${theme === Theme.LIGHT
                    ? 'dark'
                    : 'light'}`
                )}`;
        }
    }, [theme, accentColor]);

    const colorMapper = (color: Color) => {
        if (color === null) {
            return (
                <button
                    key='defaultcolor'
                    className='DefaultColor'
                    onClick={() => handleChangeAccentColor(null)}
                    title='Default (Red)'
                    style={{ outline: getOutlineStyle(null) }}
                />
            );
        }

        return (
            <button
                key={color.name}
                style={{ backgroundColor: color.value, outline: getOutlineStyle(color) }}
                onClick={() => handleChangeAccentColor(color)}
                title={color.name}
            />
        );
    };

    return (
        <div
            ref={ref}
            block='Settings-Desktop'
            mods={{ isExpanded: isExpanded }}
        >
            <button
                elem='Expander'
                onClick={() => setIsExpanded((state) => !state)}
                title='Expand Settings'
            >
                <Icon.Settings isExpanded={isExpanded} />
            </button>
            <div elem='Overlay'>
                <p elem='SettingsLabel'>
                    Settings
                </p>
                <Switch
                    onSwitch={handleThemeSwitch}
                    valueLeft={Theme.LIGHT}
                    valueRight={Theme.DARK}
                    iconLeft={<Icon.Sun />}
                    iconRight={<Icon.Moon />}
                    textLeft='Light'
                    textRight='Dark'
                    label='Color Scheme'
                    externalValue={theme}
                />
                <Slider
                    onChange={(e) => handleChangeFontSize(Number.parseFloat(e.currentTarget.value))}
                    min={0.6}
                    max={1.4}
                    step={0.01}
                    name='fontsize'
                    label='Font Size'
                    externalValue={fontSize}
                    title={`Multiplier: ${fontSize.toString()}`}

                />
                <Slider
                    onChange={(e) => handleChangeContrast(Number.parseFloat(e.currentTarget.value))}
                    min={0.8}
                    max={1.2}
                    step={0.01}
                    name='contrast'
                    label='Contrast'
                    externalValue={contrast}
                    title={`Multiplier: ${contrast.toString()}`}
                />
                <div elem='ColorPicker'>
                    <div elem='ColorPicker-ColorsContainer'>
                        {ColorMap.map(colorMapper)}
                    </div>
                    <p elem='ColorLabel'>
                        Accent Color
                    </p>
                </div>
                <button
                    elem='Reset'
                    onClick={() => reset()}
                >
                    Reset
                </button>
            </div>
        </div >
    );
};

export default SettingsDesktop;