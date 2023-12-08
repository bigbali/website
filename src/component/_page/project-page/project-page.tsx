import Head from 'next/head';
import Image from 'next/image';
import { type ProjectProps } from '@data/projects';
import { Chevron, GitHub } from '@component/icon';
import './project-page.style';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const page = {
    'youtube-video-downloader': dynamic(() => import('./project/youtube-video-downloader')),
    'algorithm-visualizer': dynamic(() => import('./project/algorithm-visualizer')),
    'messages': dynamic(() => import('./project/messages')),
    'babel-plugin': dynamic(() => import('./project/babel-plugin-transform-bem-attributes')),
    'stardust-dark': dynamic(() => import('./project/stardust-dark')),
    'balazs-burjan': dynamic(() => import('./project/balazs-burjan')),
    'photos': dynamic(() => import('./project/photos'))
};

const Back = () => (
    <div block='ProjectPage' elem='Back'>
        <a href='/' title='Back'>
            <Chevron />
            Back
        </a>
    </div>
);

export const ProjectPage = ({ project, slug }: ProjectProps) => {
    const Content = page[slug as keyof typeof page];

    if (!project) {
        return (
            <>
                <Head>
                    <title>{`Not found: ${slug}`}</title>
                </Head>
                <div block='ProjectPage'>
                    <Back />
                    <div block='ProjectPage' elem='NotFound'>
                        <p>I couldn't find this project :(</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{`Project: ${project.title}`}</title>
            </Head>
            <div block='ProjectPage'>
                <Back />
                <div elem='Content'>
                    <section className='Row0'>
                        <h1>{project.title}</h1>
                        {!!project.github && (
                            <Link
                                href={project.github}
                                target='_blank'
                                rel='noopener noreferrer'
                                title='Go to GitHub page'
                                className='GitHub'
                            >
                                <GitHub />
                                GitHub
                            </Link>
                        )}
                        {project.thumbnail.showOnProjectPage !== false && (
                            <Image
                                alt='Simple YouTube Video Downloader'
                                src={project.thumbnail.image}
                                placeholder='blur'
                                priority
                            />
                        )}
                    </section>
                    <Content />
                </div>
            </div>
        </>
    );
};

export default ProjectPage;
