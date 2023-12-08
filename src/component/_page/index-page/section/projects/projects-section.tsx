import type { RefObject } from 'react';
import { memo } from 'react';
import projects from 'data/projects';
import ProjectCard from '@component/project-card';
import './projects-section.style';

const Projects = ({
    refFromParent: projectsRef
}: {
    refFromParent: RefObject<HTMLElement>;
}) => {
    return (
        <section id='Projects' block='Projects' ref={projectsRef}>
            <h1 className='animate-on-scroll'>Some projects I've worked on</h1>
            <div block='Cards'>
                {projects.slice(0, 5).map((project) => (
                    <ProjectCard {...project} key={project.title} />
                ))}
            </div>
            {/* <div block='Cards' elem='ShowMore' className='animate-on-scroll'>
                <Link href='/projects'>See the rest</Link>
            </div> */}
        </section>
    );
};

export default memo(Projects);
