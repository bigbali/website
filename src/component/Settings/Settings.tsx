import {
    useCallback,
    useRef,
    useState
} from 'react';
import lodash from 'lodash';
import { isServer, useClickOutside } from 'Util';
import {
    Color,
    DefaultColors,
    Theme,
    useSettings
} from 'Store';
import Switch from 'Component/Switch';
import Slider from 'Component/Slider';
import Icon from 'Component/Icon';
import './Settings.style';

const ColorMap = [
    null,
    ...Object.values(DefaultColors)
];

type SettingsProps = {
    isMobile?: boolean
};

export const Settings = ({ isMobile }: SettingsProps) => {
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
    const settingsRef = useRef(null);

    const handleClickOutside = () => setIsExpanded(false);
    const handleSwitchTheme = (theme: Theme) => setTheme(theme);
    const handleChangeAccentColor = (color: Color) => setAccentColor(color);
    const handleChangeContrast = (modifier: number) => setContrast(modifier);
    const handleChangeFontSize = useCallback(lodash.debounce((modifier: number) => setFontSize(modifier), 300), []);

    const getIsColorSelected = (color: Color) => {
        if (isServer) return;

        // in this case, this means null === null
        const doesSelectedColorEqualDefault = accentColor === color;
        const doesSelectedColorEqualValue = color && accentColor && color.value === accentColor.value;

        const isColorSelected = doesSelectedColorEqualDefault || doesSelectedColorEqualValue;

        return isColorSelected;
    };

    useClickOutside(settingsRef, handleClickOutside);

    const colorMapper = (color: Color) => {
        const className = `color-swatch${getIsColorSelected(color) ? ' selected' : ''}`;

        if (color === null) {
            return (
                <button
                    key='defaultcolor'
                    className={`default-color ${className}`}
                    onClick={() => handleChangeAccentColor(null)}
                    title='Default (Red)'
                />
            );
        }

        return (
            <button
                key={color.name}
                className={className}
                style={{ backgroundColor: color.value }}
                onClick={() => handleChangeAccentColor(color)}
                title={color.name}
            />
        );
    };

    const SettingsMenu = (
        <div block='Settings' elem='Menu' mods={{ IS_IN_MOBILE_NAVIGATION: isMobile }}>
            <p elem='Label'>
                Settings
            </p>
            <Switch
                onSwitch={handleSwitchTheme}
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
    );

    if (isMobile) {
        return SettingsMenu;
    }

    // On desktop, we have a button to expand the settings menu
    return (
        <div
            ref={settingsRef}
            block='Settings'
            mods={{ IS_EXPANDED: isExpanded }}
        >
            <button
                elem='Expander'
                onClick={() => setIsExpanded((state) => !state)}
                title='Expand Settings'
            >
                <Icon.Settings isExpanded={isExpanded} />
            </button>
            {SettingsMenu}
        </div >
    );
};

export default Settings;