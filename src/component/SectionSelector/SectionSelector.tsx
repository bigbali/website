import {
    RefObject,
    useEffect,
} from 'react';
import { useSection } from 'Store';
import './SectionSelector.style';

type SectionSelectorProps = {
    sections: {
        label: string,
        ref: RefObject<HTMLElement>
    }[],
    onSelect?: (section: RefObject<HTMLElement>) => void
};

export const SectionSelector = ({ sections, onSelect }: SectionSelectorProps) => {
    const { currentSection, setCurrentSection } = useSection();

    useEffect(() => {
        const observerAction: IntersectionObserverCallback = (observedSections) => {
            observedSections.forEach(section => {
                if (section.isIntersecting) {
                    setCurrentSection(section.target as HTMLElement);
                }
            });
        };

        const observer = new IntersectionObserver(observerAction, {
            root: null,
            rootMargin: '0px',
            threshold: 0.51
        });

        sections.forEach((section) => observer.observe(section.ref.current!));

        return () => observer.disconnect();
    }, []);

    return (
        <aside block='SectionSelector'>
            {sections.map((section) => {
                return (
                    <div key={section.label}>
                        <div>
                            {section.label}
                        </div>
                        <button
                            title={`Go to ${section.label}`}
                            onClick={() => onSelect && onSelect(section.ref)}
                            className={(() => {
                                if (section.ref.current && currentSection && section.ref.current.id === currentSection.id)
                                    return 'active';
                            })()}
                        />
                    </div>
                );
            })}
        </aside>
    );
};

export default SectionSelector;