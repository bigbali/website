import { projects } from 'Component/ProjectCard/ProjectCard';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router';
// @ts-ignore
import md__balazs_burjan from './markdown/balazs-burjan.md';
// @ts-ignore
import md__react_template from './markdown/react-template.md';
import './Project.style';

const Markdown: Record<string, string> = {
    md__balazs_burjan,
    md__react_template
};

export const Project = () => {
    const { slug } = useParams();
    const [markdown, setMarkdown] = useState<string | null>(null);

    const project = projects.find((project) => project.slug === slug);

    useEffect(() => {
        if (!project || !project.slug) return;
        void fetch(Markdown[`md__${project.slug.replace('-', '_')}`])
            .then((response) => response.text()).then((text) => {
                // console.log('setting md', text);
                setMarkdown(text);
            });
    }, []);

    return (
        <div block='Page' elem='Project'>
            <h1>
                {project?.title || 'Looks like I don\'t remember the name of this project. That\'s funny.'}
            </h1>
            {markdown && <ReactMarkdown children={markdown} />}
        </div>
    );
};

export default Project;