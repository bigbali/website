import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash-es/debounce';
import { isServer, useClickOutside } from '@util';
import type { Color } from '@store';
import { DefaultColors, Theme, useSettings } from '@store';
import Switch from '@component/switch';
import Slider from '@component/slider';
import { Moon, Sun, Settings as SettingsIcon } from '@component/icon';
import './settings.style';

const ColorMap = [null, ...Object.values(DefaultColors)];

type SettingsProps = {
    isMobile?: boolean;
};

export const Settings = ({ isMobile }: SettingsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        theme,
        accentColor,
        fontSize,
        contrast,
        customCursor,
        setTheme,
        setAccentColor,
        setFontSize,
        setContrast,
        setCustomCursor,
        reset
    } = useSettings();
    const settingsRef = useRef(null);

    const handleClickOutside = () => setIsExpanded(false);
    const handleSwitchTheme = (theme: Theme) => setTheme(theme);
    const handleSwitchCustomCursor = (value: boolean) => setCustomCursor(value);
    const handleChangeAccentColor = (color: Color) => setAccentColor(color);
    const handleChangeContrast = (modifier: number) => setContrast(modifier);
    const handleChangeFontSize = useCallback(
        debounce((modifier: number) => setFontSize(modifier), 300),
        []
    );

    const getIsColorSelected = (color: Color) => {
        if (isServer) return;

        // in this case, this means null === null
        const doesSelectedColorEqualDefault = accentColor === color;
        const doesSelectedColorEqualValue =
            color && accentColor && color.value === accentColor.value;

        const isColorSelected =
            doesSelectedColorEqualDefault || doesSelectedColorEqualValue;

        return isColorSelected;
    };

    useClickOutside(settingsRef, handleClickOutside);

    const colorMapper = (color: Color) => {
        const className = `color-swatch${getIsColorSelected(color)
            ? ' selected'
            : ''
        }`;

        if (color === null) {
            return (
                <button
                    key='defaultcolor'
                    className={`default-color ${className}`}
                    onClick={() => handleChangeAccentColor(null)}
                    title='Default (Red)'
                    data-interactable
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
                data-interactable
            />
        );
    };

    const SettingsMenu = (
        <div
            block='Settings'
            elem='Menu'
            mods={{ IS_IN_MOBILE_NAVIGATION: isMobile }}
        >
            <p elem='Label'>Settings</p>
            <Switch
                onSwitch={handleSwitchTheme}
                valueLeft={Theme.LIGHT}
                valueRight={Theme.DARK}
                iconLeft={<Sun />}
                iconRight={<Moon />}
                textLeft='Light'
                textRight='Dark'
                label='Color Scheme'
                externalValue={theme}
            />
            {!isMobile &&
                <Switch
                    onSwitch={handleSwitchCustomCursor}
                    valueLeft={true}
                    valueRight={false}
                    textLeft='Yes'
                    textRight='No'
                    label='Custom Cursor'
                    externalValue={customCursor}
                />
            }
            <Slider
                onChange={(e) =>
                    handleChangeFontSize(
                        Number.parseFloat(e.currentTarget.value)
                    )
                }
                min={0.6}
                max={1.4}
                step={0.01}
                name='fontsize'
                label='Font Size'
                externalValue={fontSize}
                title={`Multiplier: ${fontSize.toString()}`}
            />
            <Slider
                onChange={(e) =>
                    handleChangeContrast(
                        Number.parseFloat(e.currentTarget.value)
                    )
                }
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
                <p elem='ColorLabel'>Accent Color</p>
            </div>
            <button elem='Reset' onClick={() => reset()} data-interactable>
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
                data-interactable
            >
                <SettingsIcon isExpanded={isExpanded} />
            </button>
            {SettingsMenu}
        </div>
    );
};

export default Settings;
