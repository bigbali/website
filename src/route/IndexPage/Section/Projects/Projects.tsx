import {
    RefObject,
    useEffect,
    useMemo,
    useRef,
    useState,
    type MouseEvent as GenericMouseEvent
} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useDevice } from 'Util';
import ProjectCard, {
    IProjectCard,
    projects,
    ProjectStatus,
    Tag
} from 'Component/ProjectCard/ProjectCard';
import Help from 'Component/Help';
import { Orientation } from 'Component/Help/Help';
import Icon from 'Component/Icon';
import './Projects.style.scss';

const DEFAULT_LIMIT = 3;

const Projects = ({ refFromParent: projectsRef }: { refFromParent: RefObject<HTMLElement> }) => {
    const [status, setStatus] = useState<ProjectStatus | 'any'>('any');
    const [title, setTitle] = useState<string>();
    const [tag, setTag] = useState<string>();
    const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
    const { isDesktop } = useDevice();
    const [isFilterExpanded, setIsFilterExpanded] = useState(isDesktop);
    const [animationRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });
    const previousLength = useRef(0);
    const filterRef = useRef<HTMLFieldSetElement | null>(null);

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

    /**
     * For some reason, using 'mods' caused the 'begin-animation' class to disappear, causing the element to be hidden.
     * This way, it works.
     */
    const expandFilter = () => {
        setIsFilterExpanded((state) => !state);
        console.log(isFilterExpanded);
        filterRef.current!.classList.toggle('IS_EXPANDED', isFilterExpanded);
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
        <section
            id='Projects'
            block='Projects'
            ref={projectsRef}
        >
            <h1 className='animate-on-scroll'>
                Some projects I've worked on
            </h1>
            <fieldset
                elem='Filter'
                className='animate-on-scroll'
                ref={filterRef}
            >
                <div>
                    <legend>
                        Filter
                    </legend>
                    <p>
                        {isDesktop && `Showing ${projectCards.length} ${projectCards.length === 1 ? 'element' : 'elements'}.`}
                        {!isDesktop && `${projectCards.length} ${projectCards.length === 1 ? 'element' : 'elements'}.`}
                    </p>
                    <button title='Expand Filters' onClick={expandFilter}>
                        <Icon.Chevron />
                    </button>
                </div>
                <div elem='Controls'>
                    <div elem='Controls-Status'>
                        <div>
                            <label htmlFor="status">
                                Status
                            </label>
                            <Help
                                orientation={Orientation.BELOW}
                                content={`
                                Explanation:<ul>
                                    <li>
                                        ${'' /* eslint-disable-next-line max-len */}
                                        <span>Finished:</span> has reached MVP (Minimally Viable Product) status, but I will likely still work on it;
                                    </li>
                                    <li>
                                        <span>In Progress:</span> I am currently working on it;
                                    </li>
                                    <li>
                                        <span>Paused:</span> I have paused work on the project, but will continue at a later date.
                                    </li>
                                </ul>
                            `}
                            />
                        </div>
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
            </fieldset>
            <div elem='ProjectCards' ref={animationRef} className='animate-on-scroll'>
                {projectCards}
            </div>
            {projectsFiltered.length !== 0 && projectsFiltered.length !== projectCards.length && (
                <div block='Projects' elem='ShowMore' className='animate-on-scroll'>
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