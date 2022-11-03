import { useMemo, useState } from 'react';
import ProjectCard, { IProjectCard, projects, ProjectStatus, Tag } from 'Component/ProjectCard/ProjectCard';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './Projects.style.scss';

const Projects = () => {
    const [status, setStatus] = useState<ProjectStatus | 'any'>('any');
    const [title, setTitle] = useState<string>();
    const [tag, setTag] = useState<string>();
    const [limit, setLimit] = useState<number>(3);
    const [animationRef] = useAutoAnimate<HTMLDivElement>();

    const filterStatus = (project: IProjectCard) => status === 'any'
        ? true
        : project.status === status;

    const filterTitle = (project: IProjectCard) => !title
        ? true
        : project.title.toLowerCase().includes(title.toLowerCase());

    const filterTag = (project: IProjectCard) => !tag
        ? true
        : project.tags.some((projectTag) => projectTag.toLowerCase().includes(tag.toLowerCase()));


    const projectCards = useMemo(() => {
        return projects
            .filter(filterStatus)
            .filter(filterTitle)
            .filter(filterTag)
            .sort((p1, p2) => p1.weight - p2.weight)
            .map((project, index) => <ProjectCard {...project} key={project.title} index={index} />);
    }, [status, title, tag, limit]);

    return (
        <section id='Projects' block='Projects'>
            <h1>
                Some projects I've worked on
            </h1>
            <div elem='Filter'>
                <div>
                    <p>
                        Filter
                    </p>
                    <p>
                        {`Showing ${projectCards.length} ${projectCards.length > 1 ? 'elements' : 'element'}.`}
                    </p>
                </div>
                <div elem='Controls'>
                    <div elem='Controls-Status'>
                        <label htmlFor="status">
                            Status
                        </label>
                        <select
                            name='status'
                            id='status'
                            onChange={(e) => setStatus(e.currentTarget.value as ProjectStatus & 'any')}
                        >
                            <option value='any' selected>
                                Any
                            </option>
                            {Object.values(ProjectStatus).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div elem='Controls-Title'>
                        <label htmlFor="title">
                            Title
                        </label>
                        <input
                            name='title'
                            id='title'
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        >
                        </input>
                    </div>
                    <div elem='Controls-Tag'>
                        <label htmlFor="tag">
                            Tag
                        </label>
                        <input type='text' list='tags' id='tag' name='tag' onChange={(e) => setTag(e.currentTarget.value)} />
                        <datalist id='tags'>
                            {Object.values(Tag).map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </datalist>
                    </div>
                </div>
            </div>
            <div elem='ProjectCards' ref={animationRef}>
                {projectCards}
            </div>
            {/* <button onClick={() => {
                if (limit > projectCards.length) {
                    return projectCards.length;
                }
            }}>
                Show More
            </button> */}
        </section>
    );
};

export default Projects;