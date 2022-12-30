import {
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useDevice } from 'Store';
import ProjectCard from 'Component/ProjectCard';
import projects, {
    type Project,
    Status,
    Tag
} from 'data/projects';
import Help from 'Component/Help';
import { Orientation } from 'Component/Help/Help';
import Icon from 'Component/Icon';
import './projects-section.style';

const Projects = ({ refFromParent: projectsRef }: { refFromParent: RefObject<HTMLElement> }) => {
    const [status, setStatus] = useState<Status | 'any'>('any');
    const [title, setTitle] = useState<string>();
    const [tag, setTag] = useState<string>();

    const { isDesktop } = useDevice(); // on mobile, override default to 1
    const DEFAULT_LIMIT = isDesktop ? 3 : 1;

    const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
    const [isFilterExpanded, setIsFilterExpanded] = useState(isDesktop);
    const [animationRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });
    const previousLength = useRef(0);
    const filterRef = useRef<HTMLFieldSetElement | null>(null);

    const filterStatus = (project: Project) => status === 'any'
        ? true
        : project.status === status;

    const filterTitle = (project: Project) => !title
        ? true
        : project.title.toLowerCase().includes(title.toLowerCase());

    const filterTag = (project: Project) => !tag
        ? true
        : project.tags.some((projectTag) => projectTag.toLowerCase().includes(tag.toLowerCase()));

    const projectsFiltered = useMemo(
        () => (projects as unknown as Project[])
            .filter(filterStatus)
            .filter(filterTitle)
            .filter(filterTag),
        [status, title, tag]
    );

    const getShowMoreCount = () => {
        return projectsFiltered.length - projectCards.length <= 3
            ? projectsFiltered.length - projectCards.length
            : 3;
    };

    /**
     * For some reason, using 'mods' caused the 'begin-animation' class to disappear, causing the element to be hidden.
     * This way, it works.
     */
    const expandFilter = useCallback(() => {
        setIsFilterExpanded((state) => !state);
    }, [isFilterExpanded]);

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

    useEffect(() => {
        filterRef.current?.classList.toggle('IS_EXPANDED', isFilterExpanded);
    }, [isDesktop, isFilterExpanded]);

    const SHOW_MORE_COUNT = getShowMoreCount();

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
                                            <span>Finished:</span> has reached MVP (Minimally Viable Product) status, but I will possibly still work on it;
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
                                setStatus(e.currentTarget.value as Status & 'any');
                                setLimit(DEFAULT_LIMIT);
                            }}
                        >
                            <option value='any'>
                                Any
                            </option>
                            {Object.values(Status).map((status) => (
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
            <div block='Projects' elem='ShowMore' className='animate-on-scroll'>
                <button
                    title='Show More Projects'
                    onClick={() => {
                        if (SHOW_MORE_COUNT === 0) {
                            setLimit(DEFAULT_LIMIT);
                            return;
                        }

                        setLimit((currentLimit) => currentLimit + 3);
                    }}
                >
                    {
                        SHOW_MORE_COUNT === 0
                            ? `Show Only ${DEFAULT_LIMIT}`
                            : `Show ${SHOW_MORE_COUNT} More`
                    }
                </button>
            </div>
            {projectCards.length === 0 && (
                <p block='Projects' elem='NotFound'>
                    It looks like there's no such project yet.
                </p>
            )}
        </section>
    );
};

export default Projects;