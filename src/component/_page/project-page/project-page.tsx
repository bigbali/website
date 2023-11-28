import { ReactNode, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useDevice } from '@store';
import projects, { type ProjectProps } from '@data/projects';
import Icon from '@component/icon';
import './project-page.style';

import page__sdl from './project/sdl';

const Page = {
    'sdl': page__sdl
};

export const ProjectPage = ({ project, slug }: ProjectProps) => {
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

    return (
        <div block='ProjectPage'>
            <div elem='Back'>
                <Link href='/' title='Back to Home Page'>
                    <Icon.Chevron />
                    BACK TO HOME
                </Link>
            </div>
            <div elem='Content'>
                {Page[slug as keyof typeof Page]()}
            </div>
        </div>
    );
};

export default ProjectPage;