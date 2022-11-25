import create from 'zustand';

interface Section {
    currentSection: HTMLElement | null,
    scrollToSectionId: string | null,
    setCurrentSection: (section: HTMLElement | null) => void,
    setScrollToSectionId: (section: string | null) => void,
};

export const useSection = create<Section>((set) => ({
    currentSection: null,
    scrollToSectionId: null,
    setCurrentSection: (currentSection) => {
        set(() => ({ currentSection }));
    },
    setScrollToSectionId: (scrollToSectionId) => {
        set(() => ({ scrollToSectionId }));
    },
}));
