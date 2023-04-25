import {
    type Dispatch,
    type SetStateAction,
    useEffect,
    useMemo,
    useRef,
    memo,
    RefObject,
} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import projects, {
    type Project,
    Status
} from 'data/projects';
import { ScrollAnimationObserver, scrollIntoView } from '@util';
import ProjectCard from '@component/project-card';
import './cards.style';

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
    sectionHeadingRef: RefObject<HTMLHeadingElement>
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
    sectionHeadingRef,
    status,
    tag,
    limit,
    title,
    setLimit,
    setElementsShownCount
}: CardsProps) => {
    const [cardsContainerRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });
    const elementsShownCountPrevious = useRef(0);
    const showMoreRef = useRef<HTMLDivElement>(null);

    // this will let us know if the cards have been re-rendered
    // note: the useAutoAnimate hook causes an initial rerender, therefore we'll consider the 2nd render instead of the 1st
    const cardsChangedCount = useRef(0);

    const projectsFiltered = useMemo(
        () => (projects)
            .filter((project) => filterStatus(project, status))
            .filter((project) => filterTitle(project, title))
            .filter((project) => filterTag(project, tag)),
        [status, title, tag]
    );

    const ProjectCards = useMemo(() => {
        const cards = projectsFiltered
            .slice(0, limit)
            .sort((p1, p2) => p1.weight - p2.weight)
            .map(project => {
                return (
                    <ProjectCard
                        {...project}
                        key={project.title}
                        applyScrollAnimation={cardsChangedCount.current === 1}
                    />
                );
            });

        cardsChangedCount.current++;
        return cards;
    }, [status, title, tag, limit, cardsChangedCount.current]);

    useEffect(() => {
        if (showMoreRef.current) {
            ScrollAnimationObserver?.add(showMoreRef.current);
        }
    }, [showMoreRef.current]);

    useEffect(() => {
        setElementsShownCount(ProjectCards.length);
    }, [ProjectCards.length]);

    useEffect(() => {
        if (elementsShownCount < elementsShownCountPrevious.current && sectionHeadingRef.current) {
            const sectionHeadingBoundingRect = sectionHeadingRef.current.getBoundingClientRect();

            if (sectionHeadingBoundingRect.top < -200) {
                scrollIntoView(sectionHeadingRef);
            }
        }

        elementsShownCountPrevious.current = elementsShownCount;
    }, [elementsShownCount, sectionHeadingRef.current]);

    const getShowMoreCount = () => {
        return projectsFiltered.length - ProjectCards.length <= 3
            ? projectsFiltered.length - ProjectCards.length
            : 3;
    };

    const shouldRenderButton = ProjectCards.length !== defaultLimit
        ? projectsFiltered.length !== 0 && ProjectCards.length >= defaultLimit
        : projectsFiltered.length !== ProjectCards.length;
    const shouldButtonReset = ProjectCards.length === projectsFiltered.length;

    return (
        <>
            <div block='Cards' ref={cardsContainerRef}>
                {ProjectCards}
            </div>
            <div
                block='Cards'
                elem='ShowMore'
                ref={showMoreRef}
                className='animate-on-scroll'
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
                ProjectCards.length === 0 && (
                    <p block='Cards' elem='NotFound'>
                        It looks like there's no such project yet.
                    </p>
                )
            }
        </>
    );
};

export default memo(Cards);
