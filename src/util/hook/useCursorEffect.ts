import { useSettings } from '@store';
import { useEffect, useRef } from 'react';

export default function useCursorEffect() {
    const cursorEffectElement = useRef<HTMLDivElement>();
    const abort = useSettings(state => !state.customCursor);

    const updateCursorPosition = (e: MouseEvent) => {
        if (!cursorEffectElement.current)
            return;

        const size = cursorEffectElement.current.getBoundingClientRect().width;
        const offsetFromCenter = size / 2;

        const x = e.clientX - offsetFromCenter;
        const y = e.clientY - offsetFromCenter;

        cursorEffectElement.current.style.translate = `${x}px ${y}px`;

        // if cursor is over any element that fulfills one of these conditions:
        //     1. has a 'data-interactive' attribute
        //     2. is a link
        //     3. is a button
        // ... then set the 'interaction' class to true
        const interactionPossible = document.elementsFromPoint(e.clientX, e.clientY)
            .some(element => (
                element.hasAttribute('data-interactable')
                || element.tagName === 'A'
                || (element.tagName === 'BUTTON' && !(element as HTMLButtonElement).disabled)));

        cursorEffectElement.current.classList.toggle('interaction', interactionPossible);
    };

    const handleMouseDown = () => {
        cursorEffectElement.current?.classList.add('pressed');
    };

    const handleMouseUp = () => {
        cursorEffectElement.current?.classList.remove('pressed');
    };

    useEffect(() => {
        if (abort)
            return;

        cursorEffectElement.current = document.createElement('div');
        cursorEffectElement.current.classList.add('cursor-effect');

        document.body.appendChild(cursorEffectElement.current);

        document.addEventListener('mousemove', updateCursorPosition);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('dragend', handleMouseUp);

        return () => {
            document.documentElement.style.cursor = 'initial';

            document.removeEventListener('mousemove', updateCursorPosition);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('dragenx', handleMouseUp);

            cursorEffectElement.current?.remove();
        };
    }, [abort]);
}
