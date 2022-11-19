import { useState } from 'react';
import { BlurhashCanvas } from 'react-blurhash';
import Icon from 'Component/Icon';
import './ProjectCard.style';

/* ========= Images ========= */
import image__this from 'Media/jpg/none.jpg';
import image__sdl from 'Media/png/sdl.png';
import image__react_template from 'Media/png/template.png';
import image__babel_plugin from 'Media/jpg/none.jpg';
import image__stardust_dark from 'Media/png/stardust_dark.png';
import image__family_photos from 'Media/jpg/none.jpg';
import image__eshop from 'Media/png/eshop.png';
import image__tankstats from 'Media/png/tankstats.png';
import image__none from 'Media/jpg/none.jpg';

const DefaultHash = 'L34CI;o~IARP?wWVMxaeM{tRofae';

const Image = {
    This: {
        PATH: image__this,
        HASH: DefaultHash
    },
    ReactTemplate: {
        PATH: image__react_template,
        HASH: DefaultHash
    },
    BabelPLugin: {
        PATH: image__babel_plugin,
        HASH: DefaultHash
    },
    SDL: {
        PATH: image__sdl,
        HASH: DefaultHash
    },
    StardustDark: {
        PATH: image__stardust_dark,
        HASH: DefaultHash
    },
    FamilyPhotos: {
        PATH: image__family_photos,
        HASH: DefaultHash
    },
    EShop: {
        PATH: image__eshop,
        HASH: DefaultHash
    },
    Tankstats: {
        PATH: image__tankstats,
        HASH: DefaultHash
    },
    Shoutout: {
        PATH: image__none,
        HASH: DefaultHash
    }
};

export enum ProjectStatus {
    FINISHED = 'Finished',
    IN_PROGRESS = 'In Progress',
    PAUSED = 'Paused',
    UNFINISHED = 'Unfinished'
}

export enum Tag {
    JS = 'JavaScript',
    TS = 'TypeScript',
    WPF = 'WPF',
    DOTNET = '.NET',
    CSHARP = 'C#',
    PYTHON = 'Python',
    FLASK = 'Flask',
    DJANGO = 'Django',
    MYSQL = 'MySQL',
    SQLITE = 'SQLite',
    C = 'C',
    SASS = 'SASS',
    REACT = 'React',
    HEROKU = 'Heroku',
    NODE = 'Node.js',
    GUN = 'Gun.js',
    BABEL = 'Babel',
    EXPRESS = 'Express',
    AWS_RDS = 'Amazon RDS',
    AWS_S3 = 'Amazon S3',
}

export enum Weight {
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3
}

type Thumbnail = {
    path: string,
    hash: string
};

export interface IProjectCard {
    title: string,
    description: string,
    thumbnail: Thumbnail,
    status: ProjectStatus,
    weight: number,
    tags: Tag[],
    github?: string,
    link?: string,
    slug?: string,
    theme?: string
};

export interface IProjectData {
    ID: string,
    THUMBNAIL: {
        PATH: string,
        HASH: string
    }
}

export const projects: IProjectCard[] = [
    {
        title: 'balazsburjan.com',
        description: `A web app to expose myself to the World Wide Web. It's built with React, using my own React Template
                      project as a foundation. It's hosted on Vercel.`,
        status: ProjectStatus.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.JS,
            Tag.TS,
            Tag.REACT,
            Tag.SASS
        ],
        thumbnail: {
            path: Image.This.PATH,
            hash: Image.This.HASH
        },
        github: 'https://github.com/bigbali/website',
        slug: 'balazs-burjan'
    },
    {
        title: 'React Template',
        description: `A template that eases the setup of a new project, as it is configured for my preference
                      and has a few things already implemented, such as routing, some icons and components, Redux,
                      a system for styles, custom hooks, etc.`,
        status: ProjectStatus.IN_PROGRESS,
        weight: Weight.HIGH,
        tags: [
            Tag.JS,
            Tag.TS,
            Tag.REACT,
            Tag.SASS
        ],
        thumbnail: {
            path: Image.ReactTemplate.PATH,
            hash: Image.ReactTemplate.HASH
        },
        github: 'https://github.com/bigbali/react-template',
        slug: 'react-template'
    },
    {
        title: 'NPM Package: babel-plugin-transform-jsx-bem-attributes',
        description: `A plugin for Babel (the JavaScript transpiler) for JSX transformation.
                      It converts 'block', 'elem' and 'mods' JSX attributes into React's 'className'.
                      This eases building classes significantly and is intended to be used with the BEM methodology.`,
        status: ProjectStatus.IN_PROGRESS,
        weight: Weight.HIGH,
        tags: [
            Tag.JS,
            Tag.TS,
            Tag.BABEL,
            Tag.NODE
        ],
        thumbnail: {
            path: Image.BabelPLugin.PATH,
            hash: Image.BabelPLugin.HASH
        },
        github: 'https://github.com/bigbali/babel-plugin-transform-jsx-bem-attributes',
        slug: 'babel-plugin'
    },
    {
        title: 'YouTube Video Downloader',
        description: `A desktop application to allow batch downloading of music videos from YouTube.
                      It exists because I thought it would be cool if I did not have to type in a command
                      into a terminal every time I wanted to download music.
                      It's blessed with a nice interface and does exactly what I need it to do, nothing more,
                      and nothing less.`,
        status: ProjectStatus.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.CSHARP,
            Tag.WPF,
            Tag.DOTNET
        ],
        thumbnail: {
            path: Image.SDL.PATH,
            hash: Image.SDL.HASH
        },
        github: 'https://github.com/bigbali/sdl-csharp',
        slug: 'sdl'
    },
    {
        title: 'Stardust Dark VS Code Theme',
        description: `A dark theme for Visual Studio Code, published to the Visual Studio Marketplace.
                      It was built for personal use, because I couldn't quite find an already existing one
                      that I would keep using for a long period of time.`,
        status: ProjectStatus.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.JS
        ],
        thumbnail: {
            path: Image.StardustDark.PATH,
            hash: Image.StardustDark.HASH
        },
        github: 'https://github.com/bigbali/stardust-dark-vscode',
        link: 'https://marketplace.visualstudio.com/items?itemName=Starcrusher.stardust-dark',
        slug: 'stardust-dark'
    },
    {
        title: 'Family Photos',
        description: `A place to show my photos to my family. It's built with Django and it was hosted on Heroku's
                      Free Tier dyno (until it was discontinued). It stored all static content on Amazon's S3 service.
                      A remake is imminent in the future.`,
        status: ProjectStatus.FINISHED,
        weight: Weight.MEDIUM,
        tags: [
            Tag.PYTHON,
            Tag.DJANGO,
            Tag.AWS_S3,
            Tag.HEROKU
        ],
        thumbnail: {
            path: Image.FamilyPhotos.PATH,
            hash: Image.FamilyPhotos.HASH
        },
        slug: 'family-photos'
    },
    {
        title: 'eShop',
        description: `My final project for Harvard University's CS50 course. It's an e-commerce application
                      built with Flask and MySQL.`,
        status: ProjectStatus.FINISHED,
        weight: Weight.MEDIUM,
        tags: [
            Tag.PYTHON,
            Tag.FLASK,
            Tag.MYSQL,
            Tag.JS,
            Tag.SASS
        ],
        thumbnail: {
            path: Image.EShop.PATH,
            hash: Image.EShop.HASH
        },
        github: 'https://github.com/bigbali/eshop',
        slug: 'eshop'
    },
    {
        title: 'Tankstats',
        description: `An application centered on strategies and statistics in World of Tanks. Although currently it's on pause,
                      in the future I intend to build it from scratch with my updated knowledge, as at the time I was building it,
                      it was a bit over my head. It includes decentralized, encrypted strategic maps, OpenID authentication and basic
                      statistics.`,
        status: ProjectStatus.PAUSED,
        weight: Weight.MEDIUM,
        tags: [
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
            path: Image.Tankstats.PATH,
            hash: Image.Tankstats.HASH
        },
        github: 'https://github.com/bigbali/tankstats-frontend',
        slug: 'tankstats'
    },
    {
        title: 'A shoutout to all the projects I never finished!',
        description: `I 've got dozens of projects I've abandoned halfway through,
                      and even though I don't even remember half of them, they still helped me
                      get to where I am today.`,
        status: ProjectStatus.UNFINISHED,
        weight: Weight.LOW,
        tags: [],
        thumbnail: {
            path: Image.Shoutout.PATH,
            hash: Image.Shoutout.HASH
        },
    }
];

const ProjectCard = ({ title, description, thumbnail, github, slug, link, tags, status, index }: IProjectCard
    & { index: number }) => {
    const isReverse = index % 2 !== 0;
    const [isReady, setIsReady] = useState(false);

    return (
        <div
            block='ProjectCard'
            mods={{
                REVERSE: isReverse,
                LOADED: isReady
            }}
        >
            <div elem='Details'>
                <h3>
                    {title}
                </h3>
                <p>
                    {description}
                </p>
                <div elem='TagsAndAnchors'>
                    <div elem='Tags'>
                        {tags.map((tag) => (
                            <span key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div elem='Anchors'>
                        {!!github && (
                            <a href={github} target='_blank' rel="noopener noreferrer" title='Go to GitHub page'>
                                <Icon.GitHub />
                            </a>
                        )}
                        {!!slug && (
                            <a href={`project/${slug}`} title='Go to project details'>
                                <Icon.File />
                            </a>
                        )}
                        {!!link && (
                            <a href={link} target='_blank' rel="noopener noreferrer" title='Go to external page'>
                                <Icon.Anchor />
                            </a>
                        )}
                    </div>
                </div>
                <div elem='Status'>
                    {status}
                </div>
            </div>
            <div elem='Thumbnail'>
                <div>
                    <img src={thumbnail.path} onLoad={() => {
                        console.log(title, 'loaded');
                        setIsReady(true);
                    }} loading='lazy' alt={title} />
                    <BlurhashCanvas
                        hash={thumbnail.hash}
                        width={146}
                        height={100}
                        punch={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;