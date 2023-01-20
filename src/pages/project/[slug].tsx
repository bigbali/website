import { readFile } from 'fs/promises';
import path from 'path';
import {
    GetStaticPropsContext,
    PreviewData
} from 'next';
import Page from 'Page';
import projects, {
    type ProjectProps
} from 'data/projects';

export const getStaticPaths = async () => {
    return {
        paths: projects.map(project => ({ params: { slug: project.slug } })),
        fallback: true
    };
};

type Context = GetStaticPropsContext<{ slug: string }, PreviewData>;

export const getStaticProps = async ({ params }: Context) => {
    const slug = params
        ? params.slug
        : undefined;

    const project = projects.find(({ slug: projectSlug }) => slug === projectSlug);

    if (!project) {
        return {
            props: {
                project: null,
                markdown: null,
                slug
            }
        };
    }

    const markdownDirectory = path.join(process.cwd(), 'data/projects/markdown');
    const file = await readFile(path.join(markdownDirectory, `${slug as string}.md`));

    return {
        props: {
            project,
            markdown: file.toString(),
            slug
        }
    };
};


const Project = ({ project, markdown, slug }: ProjectProps) => (
    <Page.Project
        project={project}
        markdown={markdown}
        slug={slug}
    />
);
export default Project;