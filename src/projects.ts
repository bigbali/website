import image__balazsburjan from '@media/webp/balazs-burjan.webp';
import image__sdl from '@media/webp/sdl.webp';
import image__algorithms from '@media/webp/algorithms.webp';
import image__babel_plugin from '@media/webp/babel-plugin.webp';
import image__stardust_dark from '@media/webp/stardust-dark.webp';
import image__photos from '@media/webp/photos.webp';
import image__eshop from '@media/webp/eshop.webp';
import image__messages from '@media/webp/messages.webp';
import type { StaticImageData } from 'next/image';

export enum Tag {
    JS = 'JavaScript',
    TS = 'TypeScript',
    REACT = 'React.js',
    SVELTE = 'Svelte',
    SVELTEKIT = 'SvelteKit',
    TRPC = 'tRPC',
    TW = 'Tailwind',
    NEXT = 'Next.js',
    BABEL = 'Babel',
    GUN = 'Gun.js',
    NODE = 'Node.js',
    SASS = 'SASS',
    EXPRESS = 'Express',
    CSHARP = 'C#',
    DOTNET = '.NET',
    WPF = 'WPF',
    PYTHON = 'Python',
    DJANGO = 'Django',
    FLASK = 'Flask',
    MYSQL = 'MySQL',
    SQLITE = 'SQLite',
    HEROKU = 'Heroku',
    AWS_RDS = 'Amazon RDS',
    AWS_S3 = 'Amazon S3',
}

export enum Weight {
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3
}

export type Project = {
    title: string,
    description: string,
    weight: number,
    tags: Tag[],
    page?: string,
    github?: string,
    slug: string,
    thumbnail: {
        image: StaticImageData,
        showOnProjectPage?: boolean
    }
};

export type ProjectProps = {
    project: Project,
    slug: string
};

export const projects = [
    {
        title: 'Algorithm Visualizer',
        description:
            'An app that aims to visualize how pathfinding algorithms work.',
        weight: Weight.HIGH,
        tags: [Tag.TS, Tag.NEXT, Tag.TW],
        thumbnail: {
            image: image__algorithms,
            showOnProjectPage: false
        },
        github: 'https://github.com/bigbali/balazs-burjan/tree/main/packages/algorithms',
        slug: 'algorithm-visualizer'
    },
    {
        title: 'YouTube Video Downloader',
        description:
            'A Windows application to allow batch downloading of music videos from YouTube.',
        weight: Weight.HIGH,
        tags: [Tag.CSHARP, Tag.WPF, Tag.DOTNET],
        thumbnail: {
            image: image__sdl
        },
        github: 'https://github.com/bigbali/sdl-csharp',
        slug: 'youtube-video-downloader'
    },
    {
        title: 'Photos',
        description:
            'An outlet through which my family can browse and download photos.',
        weight: Weight.HIGH,
        tags: [Tag.TS, Tag.SVELTEKIT, Tag.TW],
        slug: 'photos',
        thumbnail: {
            image: image__photos
        },
        github: 'https://github.com/bigbali/balazs-burjan/tree/main/apps/photos'
    },
    {
        title: 'Messages',
        description:
            'An app that allows one to log in, post a message, edit it, delete it, then log out.',
        weight: Weight.HIGH,
        tags: [Tag.TS, Tag.NEXT, Tag.TW, Tag.TRPC],
        thumbnail: {
            image: image__messages,
            showOnProjectPage: false
        },
        github: 'https://github.com/bigbali/balazs-burjan/tree/main/packages/messages',
        slug: 'messages'
    },
    {
        title: 'Babel Transpiler Plugin',
        description: `A plugin for the Babel JavaScript transpiler that creates reactive 
                      classNames from custom 'block', 'elem', and 'mods' attributes.`,
        weight: Weight.HIGH,
        tags: [Tag.TS, Tag.BABEL, Tag.NODE],
        thumbnail: {
            image: image__babel_plugin
        },
        github: 'https://github.com/bigbali/babel-plugin-transform-jsx-bem-attributes',
        slug: 'babel-plugin'
    },
    {
        title: 'Stardust Dark VS Code Theme',
        description:
            'A simplistic dark theme for Visual Studio Code that is published to the Visual Studio Marketplace.',
        weight: Weight.HIGH,
        tags: [Tag.JS],
        thumbnail: {
            image: image__stardust_dark
        },
        github: 'https://github.com/bigbali/stardust-dark-vscode',
        page: 'https://marketplace.visualstudio.com/items?itemName=Starcrusher.stardust-dark',
        slug: 'stardust-dark'
    },
    {
        title: 'balazsburjan.com',
        description: 'This website.',
        weight: Weight.MEDIUM,
        tags: [Tag.TS, Tag.NEXT, Tag.SASS],
        thumbnail: {
            image: image__eshop
        },
        github: 'https://github.com/bigbali/eshop',
        slug: 'balazs-burjan'
    }
] as Project[];

export default projects;
