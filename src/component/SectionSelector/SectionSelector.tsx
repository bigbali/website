import {
    RefObject,
    useEffect,
    useState
} from 'react';
import './SectionSelector.style';

type SectionSelectorProps = {
    sections: {
        label: string,
        ref: RefObject<HTMLElement>
    }[],
    onSelect?: (section: RefObject<HTMLElement>) => void
    callback: (sectionId: string) => void
};

export const SectionSelector = ({ sections, onSelect, callback }: SectionSelectorProps) => {
    const [activeSection, setActiveSection] = useState<HTMLElement>();

    useEffect(() => {
        const observerAction: IntersectionObserverCallback = (observedSections) => {
            observedSections.forEach(section => {
                if (section.isIntersecting) {
                    callback(section.target.id);
                    setActiveSection(section.target as HTMLElement);
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
                    <div>
                        <div>
                            {section.label}
                        </div>
                        <button
                            title={`Go to ${section.label}`}
                            onClick={() => onSelect && onSelect(section.ref)}
                            className={(() => {
                                if (section.ref.current && activeSection && section.ref.current.id === activeSection.id)
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