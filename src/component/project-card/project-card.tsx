import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from 'data/projects';
import { GitHub, File } from '@component/icon';
import './project-card.style';

const ProjectCard = ({
    title,
    description,
    thumbnail,
    github,
    slug,
    tags
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
                <h1>{title}</h1>
                <p>{description}</p>
                <div elem='TagsAndAnchors'>
                    <div elem='Tags'>
                        {tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                    <div elem='Anchors'>
                        {!!github && (
                            <Link
                                href={github}
                                target='_blank'
                                rel='noopener noreferrer'
                                title='Go to GitHub page'
                            >
                                <GitHub />
                                GitHub
                            </Link>
                        )}
                        <Link
                            href={`project/${slug}`}
                            title='Go to project details'
                        >
                            <File />
                            Go to project page
                        </Link>
                    </div>
                </div>
            </div>
            <div elem='Thumbnail'>
                <Link href={'/project/' + slug}>
                    <Image
                        src={thumbnail.image}
                        alt={title}
                        placeholder='blur'
                        onLoad={() => setIsReady(true)}
                    />
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;
