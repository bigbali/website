import { memo, useEffect, useMemo, useRef } from 'react';
import { scrollIntoView } from '@util';
import { SectionID, useSection } from '@store';
import SectionSelector from '@component/section-selector';
import Section from './section';
import './index-page.style';

const scrollToSection = (id: string | null) => {
    if (!id) return;
    const section = document.querySelector(id);
    section && scrollIntoView({ current: section as HTMLElement });
};

export const IndexPage = () => {
    const landingRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);
    const scrollToSectionId = useSection((state) => state.scrollToSectionId);
    const setScrollToSectionId = useSection(
        (state) => state.setScrollToSectionId
    );

    useEffect(() => {
        if (scrollToSectionId) {
            scrollToSection(scrollToSectionId);
            setScrollToSectionId(null);
        }
    });

    const Sections = useMemo(
        () => [
            {
                label: SectionID.LANDING,
                ref: landingRef
            },
            {
                label: SectionID.PROJECTS,
                ref: projectsRef
            },
            {
                label: SectionID.ABOUT,
                ref: aboutRef
            },
            {
                label: SectionID.CONTACT,
                ref: contactRef
            }
        ],
        []
    );

    return (
        <div block='IndexPage'>
            <Section.Landing refFromParent={landingRef} />
            <Section.Projects refFromParent={projectsRef} />
            <Section.About refFromParent={aboutRef} />
            <Section.Contact refFromParent={contactRef} />
            <SectionSelector sections={Sections} onSelect={scrollIntoView} />
        </div>
    );
};

export default memo(IndexPage);
