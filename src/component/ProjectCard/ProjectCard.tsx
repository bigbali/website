import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlurhashCanvas } from 'react-blurhash';
import { Project } from 'data/projects';
import { useDevice } from 'Store';
import Icon from 'Component/Icon';
import './ProjectCard.style';

const ProjectCard = ({ title, description, thumbnail, github, slug, page, tags, status, index }: Project
    & { index: number }) => {
    const isReverse = index % 2 !== 0;
    const [isReady, setIsReady] = useState(false);
    const { isDesktop } = useDevice();

    return (
        <article
            block='ProjectCard'
            mods={{ // we don't want to reverse on mobile, as all cards are uniform
                REVERSE: isDesktop && isReverse,
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
                <Image src={thumbnail.image} alt={title} />
            </div>
        </article>
    );
};

export default ProjectCard;