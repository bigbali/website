import { RefObject } from 'react';

export const scrollIntoView = (section: RefObject<HTMLElement>) => {
    // 10rem represented as integer
    const topOffset = Number.parseInt(getComputedStyle(document.body).fontSize.replace('px', '')) * 10;
    const sectionOffset = section.current?.offsetTop || 0;
    window.scrollTo({
        top: sectionOffset - topOffset,
        behavior: 'smooth'
    });
};
