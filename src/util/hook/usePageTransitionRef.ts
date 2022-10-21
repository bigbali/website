import { MutableRefObject } from 'react';
import { useOutletContext } from 'react-router';

/**
 * Must be used with an `<Outlet />` which has the `context` prop!
 * @returns a ref to use in the ref attribute of a page container.
 */
export const usePageTransitionRef = () => {
    const ref = useOutletContext();
    return ref as MutableRefObject<HTMLElement | null>;
};

export default usePageTransitionRef;