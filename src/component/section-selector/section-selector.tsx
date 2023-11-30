import { memo, RefObject, useEffect, useRef } from 'react';
import { range } from 'lodash';
import { useSection } from '@store';
import './section-selector.style';

type SectionSelectorProps = {
    sections: {
        label: string;
        ref: RefObject<HTMLElement>;
    }[];
    onSelect?: (section: RefObject<HTMLElement>) => void;
};

export const SectionSelector = ({
    sections,
    onSelect
}: SectionSelectorProps) => {
    const currentSection = useSection((state) => state.currentSection);
    const setCurrentSection = useSection((state) => state.setCurrentSection);
    const currentSectionRef = useRef<HTMLElement | null>();
    currentSectionRef.current = currentSection; // avoid stale closure in observer callback

    useEffect(() => {
        const observerAction: IntersectionObserverCallback = (
            observedSections
        ) => {
            observedSections.forEach((section) => {
                // if the observed element covers more than half of the screen, set it as active,
                // but if it's smaller than that, check if 50% of that element is in view and if so, set it anyway
                if (
                    section.intersectionRect.height > window.innerHeight / 2 ||
                    (section.boundingClientRect.height <
                        window.innerHeight / 2 &&
                        section.intersectionRatio > 0.5)
                ) {
                    if (
                        currentSectionRef.current &&
                        currentSectionRef.current.id === section.target.id
                    ) {
                        return;
                    }

                    setCurrentSection(section.target as HTMLElement);
                }
            });
        };

        const observer = new IntersectionObserver(observerAction, {
            root: null,
            rootMargin: '0px',
            threshold: range(0.01, 1, 0.01)
            // because on mobile, the content height could be taller than the viewport
            // it would be skipped by the observer.
            // to counter that, we observe every little movement and instead of using .isIntersecting,
            // we check if the observed element's intersecting part takes at least half of viewport's
        });

        sections.forEach((section) => observer.observe(section.ref.current!));

        return () => observer.disconnect();
    }, []);

    return (
        <aside block='SectionSelector'>
            {sections.map((section) => {
                return (
                    <div key={section.label}>
                        <div>{section.label}</div>
                        <button
                            title={`Go to ${section.label}`}
                            onClick={() => onSelect && onSelect(section.ref)}
                            className={(() => {
                                if (
                                    section.ref.current &&
                                    currentSection &&
                                    section.ref.current.id === currentSection.id
                                )
                                    return 'active';
                            })()}
                        />
                    </div>
                );
            })}
        </aside>
    );
};

export default memo(SectionSelector);
