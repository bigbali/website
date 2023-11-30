import { useCallback, useRef } from 'react';

export const useTimeout = () => {
    const _timeoutId = useRef<NodeJS.Timeout | null>(null);

    const _timeout = useCallback((callback: () => void, timeout: number) => {
        _timeoutId.current = setTimeout(callback, timeout);
        return _timeoutId.current;
    }, []);

    const _cleanup = useCallback(() => {
        _timeoutId.current
            ? clearTimeout(_timeoutId.current)
            : console.error(
                  'You need to initialize a timer before cleaning it up!'
              );
    }, []);

    return [_timeout, _cleanup] as const;
};

export default useTimeout;
