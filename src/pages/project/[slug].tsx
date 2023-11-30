import { type GetStaticPropsContext, type PreviewData } from 'next';
import Page from '@page';
import projects, { type ProjectProps } from '@data/projects';

export const getStaticPaths = async () => {
    return {
        paths: projects.map((project) => ({ params: { slug: project.slug } })),
        fallback: true
    };
};

type Context = GetStaticPropsContext<{ slug: string }, PreviewData>;

export const getStaticProps = async ({ params }: Context) => {
    const slug = params ? params.slug : undefined;

    const project = projects.find(
        ({ slug: projectSlug }) => slug === projectSlug
    );

    if (!project) {
        return {
            props: {
                project: null,
                slug
            }
        };
    }

    return {
        props: {
            project,
            slug
        }
    };
};

const Project = ({ project, slug }: ProjectProps) => (
    <Page.Project project={project} slug={slug} />
);
export default Project;
