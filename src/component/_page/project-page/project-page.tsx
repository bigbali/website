import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useDevice } from 'Store';
import Icon from 'Component/Icon';
import { type ProjectProps } from 'data/projects';
import './project-page.style';
import { useEffect, useState } from 'react';

export const ProjectPage = ({ project, markdown, slug }: ProjectProps) => {
    const isMobile = useDevice(state => state.isMobile);
    const [isMobileState, setIsMobileState] = useState(false);

    // Use mobile layout only after desktop layout has been mounted
    // to prevent hydration mismatch error
    useEffect(() => {
        setIsMobileState(!!isMobile);
    }, [isMobile]);

    if (!project) {
        return (
            <>
                <Head>
                    <title>
                        {`Not found: ${slug}`}
                    </title>
                </Head>
                <div block='ProjectPage'>
                    <div elem='Back'>
                        <a href='/' title='Back to Home Page'>
                            <Icon.Chevron />
                            BACK TO HOME
                        </a>
                    </div>
                    <div elem='NotFound'>
                        <p>
                            I couldn't find this project :(
                        </p>
                    </div>
                </div>
            </>
        );
    }

    const {
        title,
        tags,
        github,
        status,
        thumbnail: {
            image
        }
    } = project;

    const thumbnail = (
        <div block='ProjectPage' elem='ThumbnailWrapper'>
            <div elem='Thumbnail'>
                <Image
                    src={image}
                    alt={title}
                    placeholder='blur'
                    priority
                />
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

    return (
        <>
            <Head>
                <title>
                    {title}
                </title>
            </Head>
            <div block='ProjectPage'>
                <p elem='Project'>
                    Project
                </p>
                <div elem='Back'>
                    <Link href='/' title='Back to Home Page'>
                        <Icon.Chevron />
                        BACK TO HOME
                    </Link>
                </div>
                <div elem='Content'>
                    <div>
                        <h1>
                            {title}
                        </h1>
                        <div elem='Status' title={`This project is ${status.toLowerCase()}.`}>
                            {`Status: ${status}`}
                        </div>
                        {isMobileState && thumbnail}
                        <section block='ProjectPage' elem='Markdown'>
                            {markdown && (
                                <ReactMarkdown children={markdown} linkTarget="_blank" />
                            )}
                        </section>
                    </div>
                    {!isMobileState && thumbnail}
                </div>
            </div>
        </>
    );
};

export default ProjectPage;