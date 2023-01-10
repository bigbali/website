import create from 'zustand';

/**
 * Use this to refer to sections from other components
 */
export enum SectionID {
    LANDING = 'Landing',
    PROJECTS = 'Projects',
    ABOUT = 'About',
    CONTACT = 'Contact'
};

interface Section {
    currentSection: HTMLElement | null,
    scrollToSectionId: string | null
};

interface SectionStore extends Section {
    setCurrentSection: (section: HTMLElement | null) => void,
    setScrollToSectionId: (section: string | null) => void
};

export const useSection = create<SectionStore>((set) => ({
    currentSection: null,
    scrollToSectionId: null,
    setCurrentSection: (currentSection) => {
        set(() => ({ currentSection }));
    },
    setScrollToSectionId: (scrollToSectionId) => {
        set(() => ({ scrollToSectionId }));
    },
}));
