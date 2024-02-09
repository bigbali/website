import { useSettings } from '@store';
import { useCallback, useEffect, useRef } from 'react';

export default function useCursorEffect() {
    const cursorEffectElement = useRef<HTMLDivElement>();
    const abort = useSettings(state => !state.customCursor);

    const cursorPosition = {
        x: 0,
        y: 0
    };

    const updateCursor = useCallback((e: MouseEvent) => {
        if (!cursorEffectElement.current)
            return;

        const size = cursorEffectElement.current.getBoundingClientRect().width;
        const offsetFromCenter = size / 2;

        const absoluteX = e.pageX - offsetFromCenter;
        const absoluteY = e.pageY - offsetFromCenter;
        const x = e.clientX - offsetFromCenter;
        const y = e.clientY - offsetFromCenter;

        // important not to count scrollbox width
        if (x > 0 && x < document.documentElement.clientWidth - size) {
            cursorPosition.x = x;
        }

        if (y > 0 && y < document.documentElement.clientHeight - size) {
            cursorPosition.y = y;
        }

        cursorEffectElement.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;

        const interactionPossible = document.elementsFromPoint(absoluteX, absoluteY)
            .some(element => element.classList.contains('interactable'));

        cursorEffectElement.current.classList.toggle('interaction', interactionPossible);
    }, []);

    useEffect(() => {
        if (abort)
            return;

        cursorEffectElement.current = document.createElement('div');
        cursorEffectElement.current.classList.add('cursor-effect');

        document.body.appendChild(cursorEffectElement.current);
        document.documentElement.style.cursor = 'none';
        document.addEventListener('mousemove', updateCursor);

        return () => {
            document.documentElement.style.cursor = 'initial';
            document.removeEventListener('mousemove', updateCursor);
            cursorEffectElement.current?.remove();
        };
    }, [abort]);
}
