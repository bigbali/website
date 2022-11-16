import {
    RefObject,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import ProjectCard, {
    IProjectCard,
    projects,
    ProjectStatus,
    Tag
} from 'Component/ProjectCard/ProjectCard';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './Projects.style.scss';

const DEFAULT_LIMIT = 3;

const Projects = ({ refFromParent: projectsRef }: { refFromParent: RefObject<HTMLElement> }) => {
    const [status, setStatus] = useState<ProjectStatus | 'any'>('any');
    const [title, setTitle] = useState<string>();
    const [tag, setTag] = useState<string>();
    const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
    const [animationRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });
    const previousLength = useRef(0);

    const filterStatus = (project: IProjectCard) => status === 'any'
        ? true
        : project.status === status;

    const filterTitle = (project: IProjectCard) => !title
        ? true
        : project.title.toLowerCase().includes(title.toLowerCase());

    const filterTag = (project: IProjectCard) => !tag
        ? true
        : project.tags.some((projectTag) => projectTag.toLowerCase().includes(tag.toLowerCase()));

    const projectsFiltered = useMemo(
        () => projects
            .filter(filterStatus)
            .filter(filterTitle)
            .filter(filterTag),
        [status, title, tag]
    );

    const getShowMoreCount = () => {
        return projectsFiltered.length - projectCards.length <= DEFAULT_LIMIT
            ? projectsFiltered.length - projectCards.length
            : DEFAULT_LIMIT;
    };

    const projectCards = useMemo(() => {
        return projectsFiltered
            .slice(0, limit)
            .sort((p1, p2) => p1.weight - p2.weight)
            .map((project, index) => <ProjectCard {...project} key={project.title} index={index} />);
    }, [status, title, tag, limit]);

    useEffect(() => {
        if (projectCards.length < previousLength.current) {
            window.scrollTo({
                top: projectsRef.current!.offsetTop - 100
            });
        }
        previousLength.current = projectCards.length;
    }, [projectCards.length]);

    return (
        <section id='Projects' block='Projects' ref={projectsRef}>
            <h1>
                Some projects I've worked on
            </h1>
            <div elem='Filter'>
                <div>
                    <p>
                        Filter
                    </p>
                    <p>
                        {`Showing ${projectCards.length} ${projectCards.length === 1 ? 'element' : 'elements'}.`}
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
                            defaultValue='any'
                            onChange={(e) => {
                                setStatus(e.currentTarget.value as ProjectStatus & 'any');
                                setLimit(DEFAULT_LIMIT);
                            }}
                        >
                            <option value='any'>
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
            {projectsFiltered.length !== 0 && projectsFiltered.length !== projectCards.length && (
                <div block='Projects' elem='ShowMore'>
                    <button
                        title='Show More Projects'
                        onClick={() => {
                            if (limit > projectCards.length) {
                                return;
                            }

                            setLimit((currentLimit) => currentLimit + 3);
                        }}
                    >
                        Show {getShowMoreCount()} More
                    </button>
                </div>
            )}
            {projectCards.length === 0 && (
                <p block='Projects' elem='NotFound'>
                    It looks like there's no such project yet.
                </p>
            )}
        </section>
    );
};

export default Projects;