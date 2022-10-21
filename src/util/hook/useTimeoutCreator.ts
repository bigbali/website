import { useCallback, useRef } from 'react';
import { v4 } from 'uuid';

type Timeout = {
    uuid: string,
    id: NodeJS.Timeout
};

/**
 * It's an experiment, really. Don't use, I think.
 */
export const useTimeoutCreator = () => {
    const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
    const timeoutCreator = useCallback(() => {
        // const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
        let timeoutIdClosure: NodeJS.Timeout;

        const timeout = (callback: () => void, timeout: number) => {
            const timeoutId = setTimeout(callback, timeout);
            // timeoutIdRef.current = timeoutId;
            timeoutIdClosure = timeoutId;
            timeoutIdsRef.current.push(timeoutId);
            console.log('created timeout', timeoutId);
            return timeoutId;
        };

        const cleanup = () => {
            timeoutIdClosure
                ? (() => {
                    console.log('cleaning up timeout', timeoutIdClosure);
                    clearTimeout(timeoutIdClosure);
                    timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutIdClosure);
                })()
                : console.error('You are attempting to clean up an unititialized timeout!');
        };

        return [
            timeout,
            cleanup
        ] as const;
    }, []);

    const cleanupAll = () => {
        console.log('cleaning up all timeouts', timeoutIdsRef.current);

        for (let i = timeoutIdsRef.current.length - 1; i > 0; i--) {
            console.log('timeout id', timeoutIdsRef.current[i]);
            clearTimeout(timeoutIdsRef.current[i]);
        }

        timeoutIdsRef.current.length = 0;
    };

    return [
        timeoutCreator,
        cleanupAll
    ] as const;
};

export default useTimeoutCreator;