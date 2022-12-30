import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDevice } from 'Store';
import Icon from 'Component/Icon';
import './project-page.style';
import { type ProjectProps } from 'data/projects';
import Image from 'next/image';
import Link from 'next/link';


// const ProjectNotFound = () => {
//     return (
//         <Head>
//             <title></title>
//         </Head>
//         <div block='ProjectPage'>
//             <div elem='Back'>
//                 <a href='/' title='Back to Home Page'>
//                     <Icon.Chevron />
//                     BACK TO HOME
//                 </a>
//             </div>
//             <p>
//                 It looks like I couldn't find this project.
//                 Maybe there's a typo somewhere?
//             </p>
//         </div>
//     );
// };


export const ProjectPage = ({ project, markdown }: ProjectProps) => {
    const { isMobile } = useDevice();

    if (!project) {
        return null;
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
        <div block='ProjectPage'>
            <div elem='Thumbnail'>
                <Image src={image} alt={title} placeholder='blur' />
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
                    {isMobile && thumbnail}
                    <section block='ProjectPage' elem='Markdown'>
                        {markdown && (
                            <ReactMarkdown children={markdown} linkTarget="_blank" />
                        )}
                    </section>
                </div>
                {!isMobile && thumbnail}
            </div>
        </div>
    );
};

export default ProjectPage;