import { useSettings } from '@store';
import { useCallback, useEffect, useRef } from 'react';

export default function useCursorEffect() {
    const cursorEffectElement = useRef<HTMLDivElement>();
    const abort = useSettings(state => !state.customCursor);

    const updateCursor = useCallback((e: MouseEvent) => {
        if (!cursorEffectElement.current)
            return;

        const size = cursorEffectElement.current.getBoundingClientRect().width;
        const offsetFromCenter = size / 2;

        const absoluteX = e.pageX - offsetFromCenter;
        const absoluteY = e.pageY - offsetFromCenter;
        const relativeX = e.clientX - offsetFromCenter;
        const relativeY = e.clientY - offsetFromCenter;

        //                               important not to count scrollbox width
        // if (relativeX > 0 && relativeX < document.documentElement.clientWidth - size) {
        //     cursorEffectElement.current.style.left =  absoluteX + 'px';
        // }

        // if (relativeY > 0 && relativeY < document.documentElement.clientHeight - size) {
        //     cursorEffectElement.current.style.top = absoluteY + 'px';
        // }

        cursorEffectElement.current.style.transform = `translate(${relativeX}px, ${relativeY}px)`;
    }, []);

    useEffect(() => {
        if (abort)
            return;

        cursorEffectElement.current = document.createElement('div');
        cursorEffectElement.current.classList.add('cursor-effect');

        document.body.appendChild(cursorEffectElement.current);
        document.documentElement.style.cursor = 'none';
        document.addEventListener('mousemove', updateCursor);
        // document.addEventListener('scroll', updateCursor);

        return () => {
            document.documentElement.style.cursor = 'initial';
            document.removeEventListener('mousemove', updateCursor);
            cursorEffectElement.current?.remove();
        };
    }, [abort]);
}
