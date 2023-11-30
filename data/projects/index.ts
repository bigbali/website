import image__balazsburjan from '@media/webp/balazs-burjan.webp';
import image__sdl from '@media/webp/sdl.webp';
import image__react_template from '@media/webp/react-template.webp';
import image__babel_plugin from '@media/webp/babel-plugin.webp';
import image__stardust_dark from '@media/webp/stardust-dark.webp';
import image__family_photos from '@media/webp/family-photos.webp';
import image__eshop from '@media/webp/eshop.webp';
import image__tankstats from '@media/webp/tankstats.webp';
import type { StaticImageData } from 'next/image';

export enum Tag {
    JS = 'JavaScript',
    TS = 'TypeScript',
    REACT = 'React.js',
    SVELTE = 'Svelte',
    SVELTEKIT = 'SvelteKit',
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
        hash: string,
        quality: StaticImageData
    }
};

export type ProjectProps = {
    project: Project,
    slug: string
};

export const projects = [
    {
        title: 'Algorithm Visualizer',
        description: 'An app that aims to visualize how pathfinding algorithms work.',
        weight: Weight.HIGH,
        tags: [
            Tag.TS,
            Tag.NEXT,
            Tag.TW
        ],
        thumbnail: {
            image: image__react_template,
            hash: 'W25OQqWB00jZx]WB-;WBM{jZofay00R*~qjZM{of4nR*?vjZRjof'
        },
        github: 'https://github.com/bigbali/react-template',
        slug: 'react-template'
    },
    {
        title: 'Photos',
        description: 'An outlet through which my family can browse and download photos.',
        weight: Weight.HIGH,
        tags: [
            Tag.TS,
            Tag.SVELTEKIT,
            Tag.TW
        ],
        slug: 'photos',
        thumbnail: { // TODO
            image: '' as unknown as StaticImageData,
            hash: ''
        }
    },
    {
        title: 'Messages',
        description: 'An app using t',
        weight: Weight.HIGH,
        tags: [
            Tag.JS,
            Tag.TS,
            Tag.NEXT,
            Tag.TW
        ],
        thumbnail: {
            image: image__balazsburjan,
            hash: 'WYQcn}_3M_M{%MRPNGxuaxRks:WB~pD%ozxtRPoz%2M{a}t7R*oM'
        },
        github: 'https://github.com/bigbali/website',
        slug: 'messages'
    },
    {
        title: 'Babel Transpiler Plugin',
        description: `A plugin for the Babel JavaScript transpiler that creates reactive 
                      classNames from custom 'block', 'elem', and 'mods' attributes.`,
        weight: Weight.HIGH,
        tags: [
            Tag.TS,
            Tag.BABEL,
            Tag.NODE
        ],
        thumbnail: {
            image: image__babel_plugin,
            hash: 'C26[2IIUMx_200-pxaD%'
        },
        github: 'https://github.com/bigbali/babel-plugin-transform-jsx-bem-attributes',
        slug: 'babel-plugin'
    },
    {
        title: 'YouTube Video Downloader',
        description: 'A Windows application to allow batch downloading of music videos from YouTube.',
        weight: Weight.HIGH,
        tags: [
            Tag.CSHARP,
            Tag.WPF,
            Tag.DOTNET
        ],
        thumbnail: {
            image: image__sdl,
            hash: 'E87UF=oct6s:oJoL~qjZj[j@f6js',
            quality: image__sdl
        },
        github: 'https://github.com/bigbali/sdl-csharp',
        slug: 'youtube-video-downloader'
    },
    {
        title: 'Stardust Dark VS Code Theme',
        description: 'A simplistic dark theme for Visual Studio Code that is published to the Visual Studio Marketplace.',
        weight: Weight.HIGH,
        tags: [
            Tag.JS
        ],
        thumbnail: {
            image: image__stardust_dark,
            hash: 'W13l2M^lVaITI-NF$x%1ahR+WEaMt7slxbX9aenOW9bcR:SNbWoI'
        },
        github: 'https://github.com/bigbali/stardust-dark-vscode',
        page: 'https://marketplace.visualstudio.com/items?itemName=Starcrusher.stardust-dark',
        slug: 'stardust-dark'
    },
    {
        title: 'Family Photos',
        description: `The original photos app built with Django.
                      It was hosted on Heroku's Free Tier dyno until it was discontinued and used AWS S3 for storage.`,
        weight: Weight.MEDIUM,
        tags: [
            Tag.PYTHON,
            Tag.DJANGO,
            Tag.AWS_S3,
            Tag.HEROKU
        ],
        thumbnail: {
            image: image__family_photos,
            hash: 'WAFYrv5W==Z}.T~WS8xtM}f,RiM{x]w[o}tSemIUJD%1IVRjadS5'
        },
        slug: 'family-photos'
    },
    {
        title: 'eShop',
        description: `My final project for Harvard University's CS50 course. It's an e-commerce application
                      built with Flask and MySQL.`,
        weight: Weight.MEDIUM,
        tags: [
            Tag.PYTHON,
            Tag.FLASK,
            Tag.MYSQL,
            Tag.JS,
            Tag.SASS
        ],
        thumbnail: {
            image: image__eshop,
            hash: 'WKQ0R4oH-;D%R*WAE4jERjWCt8oe?^ofM|s:aej]-otRozodM_WC'
        },
        github: 'https://github.com/bigbali/eshop',
        slug: 'eshop'
    }
] as Project[];

export default projects;
