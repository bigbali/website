import {
    type Dispatch,
    type SetStateAction,
    useEffect,
    useMemo,
    useRef
} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import projects, {
    type Project,
    Status
} from 'data/projects';
import ProjectCard from 'Component/ProjectCard';

const filterStatus = (project: Project, status: Status) => status === Status.ANY
    ? true
    : project.status === status;

const filterTitle = (project: Project, title?: string) => !title
    ? true
    : project.title.toLowerCase().includes(title.toLowerCase());

const filterTag = (project: Project, tag?: string) => !tag
    ? true
    : project.tags.some((projectTag) => projectTag.toLowerCase().includes(tag.toLowerCase()));

type CardsProps = {
    defaultLimit: number,
    elementsShownCount: number,
    status: Status,
    tag?: string,
    title?: string
    limit?: number,
    setLimit: Dispatch<SetStateAction<number>>
    setElementsShownCount: Dispatch<SetStateAction<number>>
};

const Cards = ({
    defaultLimit,
    elementsShownCount,
    status,
    tag,
    limit,
    title,
    setLimit,
    setElementsShownCount
}: CardsProps) => {
    const [cardsContainerRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });
    const elementsShownCountPrevious = useRef(0);

    const projectsFiltered = useMemo(
        () => (projects as unknown as Project[])
            .filter((project) => filterStatus(project, status))
            .filter((project) => filterTitle(project, title))
            .filter((project) => filterTag(project, tag)),
        [status, title, tag]
    );

    const projectCards = useMemo(() => {
        return projectsFiltered
            .slice(0, limit)
            .sort((p1, p2) => p1.weight - p2.weight)
            .map((project, index) => <ProjectCard {...project} key={project.title} index={index} />);
    }, [status, title, tag, limit]);

    useEffect(() => {
        setElementsShownCount(projectCards.length);
    }, [projectCards.length]);


    useEffect(() => {
        if (elementsShownCount < elementsShownCountPrevious.current) {
            window.scrollTo({
                top: cardsContainerRef.current!.offsetTop - 100
            });
        }

        elementsShownCountPrevious.current = elementsShownCount;
    }, [elementsShownCount]);

    const getShowMoreCount = () => {
        return projectsFiltered.length - projectCards.length <= 3
            ? projectsFiltered.length - projectCards.length
            : 3;
    };

    const shouldRenderButton = projectCards.length !== defaultLimit
        ? projectsFiltered.length !== 0 && projectCards.length >= defaultLimit
        : projectsFiltered.length !== projectCards.length;
    const shouldButtonReset = projectCards.length === projectsFiltered.length;

    return (
        <>
            <div block='ProjectCards' ref={cardsContainerRef} className='animate-on-scroll'>
                {projectCards}
            </div>
            <div
                block='Projects'
                elem='ShowMore'
                className='animate-on-scroll'
                // FIX
                // removing the element from DOM breaks intersection observer because new instance is created and observer doesnt know
                style={{ display: shouldRenderButton ? 'flex' : 'none' }}>
                <button
                    title='Show More Projects'
                    onClick={() => {
                        if (shouldButtonReset) {
                            setLimit(defaultLimit);
                            return;
                        }

                        setLimit((currentLimit) => currentLimit + 3);
                    }}
                >
                    {
                        shouldButtonReset
                            ? `Show Only ${defaultLimit}`
                            : `Show ${getShowMoreCount()} More`
                    }
                </button>
            </div>
            {
                projectCards.length === 0 && (
                    <p block='Projects' elem='NotFound'>
                        It looks like there's no such project yet.
                    </p>
                )
            }
        </>
    );
};

export default Cards;
