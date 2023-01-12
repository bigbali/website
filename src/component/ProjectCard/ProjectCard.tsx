import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from 'data/projects';
import Icon from 'Component/Icon';
import './ProjectCard.style';

const ProjectCard = ({ title, description, thumbnail, github, slug, page, tags, status }: Project) => {
    const [isReady, setIsReady] = useState(false);

    return (
        <article
            block='ProjectCard'
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
                            </a>
                        )}
                        {!!slug && (
                            <Link href={`project/${slug}`} rel='bookmark' title='Go to project details'>
                                <Icon.File />
                            </Link>
                        )}
                        {!!page && (
                            <a href={page} target='_blank' rel="noopener noreferrer" title='Go to external page'>
                                <Icon.Anchor />
                            </a>
                        )}
                    </div>
                </div>
                <div elem='Status'>
                    {status}
                </div>
            </div>
            <div elem='Thumbnail'>
                <Image src={thumbnail.image} alt={title} placeholder='blur' onLoad={() => setIsReady(true)} />
            </div>
        </article>
    );
};

export default ProjectCard;