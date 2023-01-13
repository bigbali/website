/**
 * Wraps a string with url().
 * @param importedMedia a string which you want to wrap with url().
 * @returns 'url(importedMedia)'.
 */
export const url = (importedMedia: string) => {
    return `url(${importedMedia})`;
};

export default url;