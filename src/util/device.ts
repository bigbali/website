import { isServer } from './environment';

/**
 * Determines if the device is mobile based on a media query (max-width: 810px).
 */
export const getIsMobile = (): boolean | undefined => {
    if (isServer) return undefined;

    // Check for screens horizontally smaller than 810px
    return window.matchMedia('(max-width: 810px)').matches;
};
