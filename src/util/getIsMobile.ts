export const getIsMobile = (): boolean => {
    // Check for screens horizontally smaller than 810px
    return window.matchMedia('(max-width: 810px)').matches;
};

export default getIsMobile;