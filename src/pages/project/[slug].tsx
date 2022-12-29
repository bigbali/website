import { promises } from 'fs';
import { readFile } from 'fs/promises';
import { GetStaticPaths, GetStaticProps } from 'next';
import Page from 'Page';
import path from 'path';

export const getStaticPaths: GetStaticPaths = async () => {
    const markdownDirectory = path.join(process.cwd(), 'src/component/_page/project-page/markdown');
    const markdownFiles = await promises.readdir(markdownDirectory);

    return {
        paths: markdownFiles.map(fileName => ({ params: { slug: fileName.replace('.md', '') } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<{ markdown: string }> = async ({ params }) => {
    const slug = params?.slug as string;
    const markdownDirectory = path.join(process.cwd(), 'src/component/_page/project-page/markdown');
    const file = await readFile(path.join(markdownDirectory, `${slug}.md`));

    return {
        props: { markdown: file.toString() }
    };
};


const Project = ({ markdown }: { markdown: string }) => <Page.Project markdown={markdown} />;
export default Project;