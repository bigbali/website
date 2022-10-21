import { useCallback, useMemo } from 'react';

export const useInterval = (callback: () => void, interval = 1000) => {
    const _interval = useMemo(() => {
        return setInterval(callback, interval);
    }, []);

    const _cleanup = useCallback(() => {
        clearInterval(_interval);
    }, []);

    return [_interval, _cleanup] as const;
};

export default useInterval;