import image__balazsburjan from '@media/webp/balazs-burjan.webp';
import image__sdl from '@media/webp/sdl.webp';
import image__react_template from '@media/webp/react-template.webp';
import image__babel_plugin from '@media/webp/babel-plugin.webp';
import image__stardust_dark from '@media/webp/stardust-dark.webp';
import image__family_photos from '@media/webp/family-photos.webp';
import image__eshop from '@media/webp/eshop.webp';
import image__tankstats from '@media/webp/tankstats.webp';
import { StaticImageData } from 'next/image';

export enum Status {
    FINISHED = 'Finished',
    IN_PROGRESS = 'In Progress',
    PAUSED = 'Paused',
    ANY = 'Any'
};

export enum Tag {
    JS = 'JavaScript',
    TS = 'TypeScript',
    REACT = 'React',
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
};

export enum Weight {
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3
};

export type Project = {
    title: string,
    description: string,
    status: Status,
    weight: number,
    tags: Tag[],
    page?: string,
    github?: string,
    stackblitz?: string,
    slug: string,
    thumbnail: {
        image: StaticImageData,
        hash: string
    }
};

export type ProjectProps = {
    project: Project,
    markdown: string,
    slug: string
};

const projects = [
    {
        title: 'balazsburjan.com',
        description: `The site you are currently browsing. It's built with React and Next.js, using my own React Template
                      project as a foundation. It's hosted on Vercel.`,
        status: Status.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.JS,
            Tag.TS,
            Tag.REACT,
            Tag.NEXT,
            Tag.SASS
        ],
        thumbnail: {
            image: image__balazsburjan,
            hash: 'WYQcn}_3M_M{%MRPNGxuaxRks:WB~pD%ozxtRPoz%2M{a}t7R*oM'
        },
        github: 'https://github.com/bigbali/website',
        slug: 'balazs-burjan'
    },
    {
        title: 'React Template',
        description: `A custom-built template that eases the setup of a new project
                      by having some features already implemented, such as routing,
                      components, Redux, a system for styles, custom hooks, etc.`,
        status: Status.IN_PROGRESS,
        weight: Weight.HIGH,
        tags: [
            Tag.JS,
            Tag.TS,
            Tag.REACT,
            Tag.SASS
        ],
        thumbnail: {
            image: image__react_template,
            hash: 'W25OQqWB00jZx]WB-;WBM{jZofay00R*~qjZM{of4nR*?vjZRjof'
        },
        github: 'https://github.com/bigbali/react-template',
        slug: 'react-template'
    },
    {
        title: 'Babel Plugin',
        description: 'A plugin for the Babel JavaScript transpiler for JSX-to-JSX transformations.',
        status: Status.IN_PROGRESS,
        weight: Weight.HIGH,
        tags: [
            Tag.JS,
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
        description: `A desktop application to allow batch downloading of music videos from YouTube.
                      It exists because I decided that there are more efficient ways of doing things
                    than typing long and complex commands into a terminal.`,
        status: Status.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.CSHARP,
            Tag.WPF,
            Tag.DOTNET
        ],
        thumbnail: {
            image: image__sdl,
            hash: 'E87UF=oct6s:oJoL~qjZj[j@f6js'
        },
        github: 'https://github.com/bigbali/sdl-csharp',
        slug: 'sdl'
    },
    {
        title: 'Stardust Dark VS Code Theme',
        description: 'A dark theme for Visual Studio Code that is published to the Visual Studio Marketplace.',
        status: Status.FINISHED,
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
        description: `A place where my family could see my photos, but mostly the ones taken at family events.
                      It was built with Django and was hosted on Heroku's Free Tier dyno until it was discontinued.
                      It stored all static content on Amazon's S3 service.`,
        status: Status.FINISHED,
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
        status: Status.FINISHED,
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
    },
    {
        title: 'Tankstats',
        description: `An application centered on strategies and statistics in World of Tanks. Although currently, it's on pause,
                      in the future I intend to build it from scratch with my updated knowledge.
                      It includes decentralized, encrypted strategic maps, OpenID authentication, and basic
                      statistics.`,
        status: Status.PAUSED,
        weight: Weight.MEDIUM,
        tags: [
            Tag.REACT,
            Tag.NODE,
            Tag.EXPRESS,
            Tag.JS,
            Tag.TS,
            Tag.GUN,
            Tag.DJANGO,
            Tag.AWS_S3,
            Tag.AWS_RDS
        ],
        thumbnail: {
            image: image__tankstats,
            hash: 'NQQ0da~Wx]D%V?W=_3E1Mxt7ozoy~p9GRi%MWrf5'
        },
        github: 'https://github.com/bigbali/tankstats-frontend',
        slug: 'tankstats'
    }
];

export default projects;
