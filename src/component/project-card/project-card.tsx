import {
    useRef,
    useState
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from 'data/projects';
import Icon from '@component/icon';
import './project-card.style';

const ProjectCard = ({
    title,
    description,
    thumbnail,
    github,
    slug,
    tags,
}: Project) => {
    const [isReady, setIsReady] = useState(false);
    const ref = useRef<HTMLElement>(null);

    return (
        <article
            block='ProjectCard'
            className='animate-on-scroll'
            ref={ref}
            mods={{
                LOADED: isReady
            }}
        >
            <div elem='Details'>
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
                <div elem='TagsAndAnchors'>
                    <div elem='Tags'>
                        {tags.map((tag) => (
                            <span key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div elem='Anchors'>
                        {!!github && (
                            <a href={github} target='_blank' rel="noopener noreferrer" title='Go to GitHub page'>
                                <Icon.GitHub />
                                GitHub
                            </a>
                        )}
                        <Link href={`project/${slug}`} rel='bookmark' title='Go to project details'>
                            <Icon.File />
                            Go to project page
                        </Link>
                    </div>
                </div>
            </div>
            <div elem='Thumbnail'>
                <Link href={'/projects/' + slug}>
                    <Image src={thumbnail.image} alt={title} placeholder='blur' onLoad={() => setIsReady(true)} />
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;