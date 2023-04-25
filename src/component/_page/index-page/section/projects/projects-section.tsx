import {
    memo,
    RefObject,
    useRef,
    useState,
} from 'react';
import dynamic from 'next/dynamic';
import {
    Status
} from 'data/projects';
import { useDevice } from '@store';
import './projects-section.style';

const Filter = dynamic(() => import('./filter'), { ssr: false });
const Cards = dynamic(() => import('./cards'), { ssr: false });

const Projects = ({ refFromParent: projectsRef }: { refFromParent: RefObject<HTMLElement> }) => {
    // We'll need to check if heading is in viewport to know if we should scroll back
    // on content change
    const sectionHeadingRef = useRef<HTMLHeadingElement>(null);
    const isDesktop = useDevice((state) => state.isDesktop);
    const DEFAULT_LIMIT = isDesktop
        ? 3
        : 1;
    const [elementsShownCount, setElementsShowCount] = useState(DEFAULT_LIMIT);

    const [status, setStatus] = useState<Status>(Status.ANY);
    const [title, setTitle] = useState<string>();
    const [tag, setTag] = useState<string>();
    const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

    return (
        <section
            id='Projects'
            block='Projects'
            ref={projectsRef}
        >
            <h1 className='animate-on-scroll' ref={sectionHeadingRef}>
                Some projects I've worked on
            </h1>
            <Filter
                defaultLimit={DEFAULT_LIMIT}
                elementsShownCount={elementsShownCount}
                isDesktop={isDesktop}
                setStatus={setStatus}
                setTag={setTag}
                setLimit={setLimit}
                setTitle={setTitle}
            />
            <Cards
                defaultLimit={DEFAULT_LIMIT}
                elementsShownCount={elementsShownCount}
                sectionHeadingRef={sectionHeadingRef}
                status={status}
                tag={tag}
                limit={limit}
                title={title}
                setLimit={setLimit}
                setElementsShownCount={setElementsShowCount}
            />
        </section>
    );
};

export default memo(Projects);