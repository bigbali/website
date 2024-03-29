import { type Settings, Theme } from '@store';

/**
 * Applies settings to the HTML.
 * @param settings settings from the Settings Store.
 */
export const applySettings = ({
    theme,
    accentColor,
    fontSize,
    contrast,
    customCursor
}: Settings) => {
    const body = document.body;
    const html = document.documentElement;

    body.classList.toggle('theme-light', theme === Theme.LIGHT);
    body.classList.toggle('theme-dark', theme === Theme.DARK);
    body.classList.toggle('custom-cursor', customCursor);

    if (accentColor) {
        body.style.setProperty('--color-theme', accentColor.value);
    } else {
        body.style.removeProperty('--color-theme');
    }

    html.style.fontSize = `${fontSize || 1}em`;
    html.style.filter = `contrast(${contrast || 1})`;
};
