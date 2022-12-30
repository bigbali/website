import { readFile } from 'fs/promises';
import { GetStaticPropsContext, PreviewData } from 'next';
import Page from 'Page';
import path from 'path';
import projects, {
    type ProjectProps
} from 'data/projects';

export const getStaticPaths = async () => {
    return {
        paths: projects.map(project => ({ params: { slug: project.slug } })),
        fallback: false
    };
};

type Context = GetStaticPropsContext<{ slug: string }, PreviewData>;

export const getStaticProps = async ({ params }: Context) => {
    if (!params) return;

    const { slug } = params;

    const project = projects.find(({ slug: projectSlug }) => slug === projectSlug);

    const markdownDirectory = path.join(process.cwd(), 'data/projects/markdown');
    const file = await readFile(path.join(markdownDirectory, `${slug}.md`));

    return {
        props: {
            project,
            markdown: file.toString()
        }
    };
};


const Project = ({ project, markdown }: ProjectProps) => <Page.Project project={project} markdown={markdown} />;
export default Project;