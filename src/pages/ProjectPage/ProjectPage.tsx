import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BlurhashCanvas } from 'react-blurhash';
import ReactMarkdown from 'react-markdown';
import { useDevice } from 'Store';
import { projects } from 'Component/ProjectCard/ProjectCard';
import Icon from 'Component/Icon';
import './ProjectPage.module';

import md__balazs_burjan from './markdown/balazs-burjan.md';
import md__react_template from './markdown/react-template.md';
import md__babel_plugin from './markdown/babel-plugin.md';
import md__stardust_dark from './markdown/stardust-dark.md';
import md__sdl from './markdown/sdl.md';
import md__tankstats from './markdown/tankstats.md';
import md__family_photos from './markdown/family-photos.md';
import md__eshop from './markdown/eshop.md';

const Markdown: Record<string, string> = {
    md__balazs_burjan,
    md__react_template,
    md__babel_plugin,
    md__stardust_dark,
    md__sdl,
    md__tankstats,
    md__family_photos,
    md__eshop
};

const ProjectNotFound = () => {
    return (
        <div block='ProjectPage'>
            <div elem='Back'>
                <a href='/' title='Back to Home Page'>
                    <Icon.Chevron />
                    BACK TO HOME
                </a>
            </div>
            <p>
                It looks like I couldn't find this project.
                Maybe there's a typo somewhere?
            </p>
        </div>
    );
};

export const ProjectPage = () => {
    const { slug } = useParams();
    const [markdown, setMarkdown] = useState<string | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const { isMobile } = useDevice();

    const project = projects.find((project) => project.slug === slug);

    if (!project) {
        return <ProjectNotFound />;
    }

    const {
        title,
        tags,
        thumbnail: {
            hash,
            path
        },
        github,
        status
    } = project;

    const thumbnail = (
        <div block='ProjectPage'>
            <div elem='Thumbnail' mods={{ IS_LOADED: isImageLoaded }}>
                <div>
                    <img
                        src={path}
                        onLoad={() => setIsImageLoaded(true)}
                        alt={title}
                    />
                    <BlurhashCanvas
                        hash={hash}
                        width={146}
                        height={100}
                        punch={1}
                    />
                </div>
            </div>
            <div elem='GitHubAndTags'>
                {github && (
                    <a
                        href={github}
                        target='_blank'
                        rel='noopener noreferrer'
                        title='Go to GitHub page'
                    >
                        <Icon.GitHub />
                        <span>
                            See on GitHub
                        </span>
                    </a>
                )}
                <div elem='Tags'>
                    {tags.map((tag) => (
                        <span key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        if (!slug) return;
        void fetch(Markdown[`md__${slug.replace('-', '_')}`])
            .then((response) => response.text()).then((text) => {
                setMarkdown(text);
            });
    }, []);

    return (
        <div block='ProjectPage'>
            <p elem='Project'>
                Project
            </p>
            <div elem='Back'>
                {/*
                    Not using react-router.Link because that causes a bug upon returning to home page:
                    document.querySelector(All) does not initially select anything, even though called after the component
                    has been mounted. I couldn't get myself to understand it, so let's not get bogged down on it.
                    PS: bug is caused by the react-transition-group page transition, but it's more efficient
                    to just simply go around it.
                */}
                <a href='/' title='Back to Home Page'>
                    <Icon.Chevron />
                    BACK TO HOME
                </a>
            </div>
            <div elem='Content'>
                <div>
                    <h1>
                        {title}
                    </h1>
                    <div elem='Status' title={`This project is ${status.toLowerCase()}`}>
                        {`Status: ${status}`}
                    </div>
                    {isMobile && thumbnail}
                    <section block='ProjectPage' elem='Markdown' mods={{ IS_LOADED: !!markdown }}>
                        <div>
                            {!!markdown && <ReactMarkdown children={markdown} linkTarget="_blank" />}
                        </div>
                        {!markdown && (
                            <>
                                <p className='suspense' />
                                <p className='suspense' />
                                <p className='suspense' />
                                <p className='suspense' />
                                <p className='suspense' />
                                <p className='suspense' />
                                <p className='suspense' />
                                <p className='suspense' />
                            </>
                        )}
                    </section>
                </div>
                {!isMobile && thumbnail}
            </div>
        </div>
    );
};

export default ProjectPage;