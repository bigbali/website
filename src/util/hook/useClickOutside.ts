import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (
    ref: RefObject<HTMLElement>,
    callback: (event: MouseEvent) => void
) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            const { current: element } = ref;
            element &&
                !element.contains(event.target as Node) &&
                savedCallback.current(event);
        };

        document.addEventListener('click', handler);

        return () => document.removeEventListener('click', handler);
    }, [ref]);
};

export default useClickOutside;
