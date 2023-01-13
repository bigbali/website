import { type RefObject } from 'react';
import { range } from 'lodash';
import { isClient } from './environment';

/**
 * Scrolls to an HTML element with an offset of 10rem.
 */
export const scrollIntoView = (section: RefObject<HTMLElement>) => {
    // 10rem represented as integer
    const topOffset = Number.parseInt(getComputedStyle(document.body).fontSize.replace('px', '')) * 10;
    const sectionOffset = section.current?.offsetTop || 0;
    window.scrollTo({
        top: sectionOffset - topOffset,
        behavior: 'smooth'
    });
};

type ScrollObserverCallback = (elements: IntersectionObserverEntry[], observer: Observer) => void
interface Observer {
    add: (element: HTMLElement) => void,
    delete: (element: HTMLElement) => void,
    observe: (query: string) => void,
    disconnect: () => void
}

export class ScrollObserver implements Observer {
    #observer: IntersectionObserver;
    #observed = new Set<HTMLElement>();

    constructor(callback: ScrollObserverCallback, options: IntersectionObserverInit) {
        this.#observer = new IntersectionObserver((elements) => callback(elements, this), options);
    }

    add(element: HTMLElement) {
        this.#observer.observe(element);
        return this.#observed.add(element);
    }

    delete(element: HTMLElement) {
        this.#observer.unobserve(element);
        return this.#observed.delete(element);
    }

    observe(query: string) {
        document.querySelectorAll(query).forEach((element) => this.add(element as HTMLElement));
    };

    disconnect() {
        this.#observer.disconnect();
        this.#observed.clear();
    }
}

const scrollAnimationCallback: ScrollObserverCallback = (elements, observer) => {
    elements.forEach(element => {
        if (element.target.getAnimations().length === 0 && element.isIntersecting) {
            element.target.classList.add('begin-animation');

            // after an element has been animated in, we don't need to watch it any more
            observer.delete(element.target as HTMLElement);
        }
    });
};

/**
 * The observer responsible for scroll animations.
 */
export const ScrollAnimationObserver = (() => {
    if (isClient) {
        return new ScrollObserver(scrollAnimationCallback, {
            root: null,
            rootMargin: '-80px 0px -80px 0px',
            threshold: range(0.01, 1, 0.05)
        })
    }
})();
