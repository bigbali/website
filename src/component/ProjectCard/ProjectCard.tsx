import './ProjectCard.style';
import gif from '../../media/gif/gif.gif';
import { Link } from 'react-router-dom';
import Icon from 'Component/Icon';

export enum ProjectStatus {
    FINISHED = 'Finished',
    IN_PROGRESS = 'In Progress',
    PAUSED = 'Paused',
    UNFINISHED = 'Unfinished'
}

export enum Tag {
    JS = 'JavaScript',
    TS = 'TypeScript',
    JAVA = 'Java',
    WPF = 'WPF',
    DOTNET = '.NET',
    CSHARP = 'C#',
    PYTHON = 'Python',
    FLASK = 'Flask',
    DJANGO = 'Django',
    DJANGO_REST_FRAMEWORK = 'Django REST Framework',
    MYSQL = 'MySQL',
    SQLITE = 'SQLite',
    C = 'C',
    SASS = 'SASS',
    REACT = 'React',
    AWS = 'AWS',
    AWS_S3 = 'AWS S3',
    HEROKU = 'Heroku',
    NODE = 'Node.js',
    GUN = 'Gun.js'
}

export enum Weight {
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3
}

export interface IProjectCard {
    title: string,
    description: string,
    thumbnail: string,
    status: ProjectStatus,
    weight: number,
    tags: Tag[],
    github?: string,
    slug?: string,
    theme?: string
};

export const projects: IProjectCard[] = [
    {
        title: 'The application you are currently browsing',
        description: `A web app to expose myself to the World Wide Web. It's built with React, using my own React Template
                      project as a foundation. It's hosted on GitHub Pages.`,
        thumbnail: gif,
        status: ProjectStatus.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.TS,
            Tag.REACT,
            Tag.SASS
        ],
        github: '',
        slug: 'this'
    },
    {
        title: 'React Template',
        description: `A template that eases the setup of a new project, as it is configured for my preference
                      and has a few things already implemented, such as routing, some icons and components, Redux,
                      a system for styles, custom hooks, etc.`,
        thumbnail: gif,
        status: ProjectStatus.IN_PROGRESS,
        weight: Weight.HIGH,
        tags: [
            Tag.TS,
            Tag.REACT,
            Tag.SASS
        ],
        github: 'https://github.com/bigbali/react-template',
        slug: 'react-template'
    },
    {
        title: 'NPM Package: babel-plugin-transform-bem-attributes',
        description: `A plugin for Babel (the JavaScript transpiler) for JSX transformation.
                      It converts 'block', 'elem' and 'mods' JSX attributes into React's 'className'.
                      This eases building classes significantly and is intended to be used with the BEM methodology.`,
        thumbnail: gif,
        status: ProjectStatus.IN_PROGRESS,
        weight: Weight.HIGH,
        tags: [
            Tag.TS
        ],
        github: '',
        slug: 'babel-plugin'
    },
    {
        title: 'YouTube Video Downloader',
        description: `A desktop application to allow batch downloading of music videos from YouTube.
                      It exists because I thought it would be cool if I did not have to type in a command
                      into a terminal every time I wanted to download music.
                      It's blessed with a nice interface and does exactly what I need it to do, nothing more,
                      and nothing less.`,
        thumbnail: gif,
        status: ProjectStatus.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.CSHARP,
            Tag.WPF
        ],
        github: '',
        slug: 'sdl'
    },
    {
        title: 'Stardust Dark VS Code Theme',
        description: `A dark theme for Visual Studio Code, published to the Visual Studio Marketplace.
                      It was built for personal use, because I couldn't quite find an already existing one
                      that I could keep for a long period of time.`,
        thumbnail: gif,
        status: ProjectStatus.FINISHED,
        weight: Weight.HIGH,
        tags: [
            Tag.JS
        ],
        github: '',
        slug: 'stardust-dark'
    },
    {
        title: 'Family Photos',
        description: `A place to show my photos to my family. It's built with Django and is hosted on Heroku's
                      Free Tier dyno. It stores all static content on Amazon's S3 service.`,
        thumbnail: gif,
        status: ProjectStatus.FINISHED,
        weight: Weight.MEDIUM,
        tags: [
            Tag.PYTHON,
            Tag.DJANGO,
            Tag.AWS,
            Tag.AWS_S3,
            Tag.HEROKU
        ],
        github: '',
        slug: 'family-photos'
    },
    {
        title: 'eShop',
        description: `My final project for Harvard University's CS50 course. It's an e-commerce application
                      built with Flask and MySQL.`,
        thumbnail: gif,
        status: ProjectStatus.FINISHED,
        weight: Weight.MEDIUM,
        tags: [
            Tag.PYTHON,
            Tag.FLASK,
            Tag.MYSQL
        ],
        github: '',
        slug: 'eshop'
    },
    {
        title: 'Tankstats',
        description: `An application centered on strategies and statistics in World of Tanks.
                      It's on pause of now, but when finished, it will: allow to create encrypted strategic maps,
                      show statistics of both players and clans, display information about in-game maps
                      (even the 3D maps from the game, though I couldn't figure that out yet).
                      It could also authenticate to Wargaming.net using OpenID authentication.
                      It uses React with TypeScript for the frontend with Gun.js (a decentralized graph database
                      that allows to implement security features relatively easily). For the backend I wanted to use Django,
                      but I switched to Node.js so I can use it as a Gun.js server.`,
        thumbnail: gif,
        status: ProjectStatus.PAUSED,
        weight: Weight.MEDIUM,
        tags: [
            Tag.NODE,
            Tag.TS,
            Tag.GUN
        ],
        github: '',
        slug: 'tankstats'
    },
    {
        title: 'Minecraft Plugin',
        description: `A server plugin for Minecraft. Although I lost interest in the project,
                      I still consider it somewhat important as it provided a perspective
                      of what it's like when you have to handle multiple players efficiently
                      in real time.`,
        thumbnail: gif,
        status: ProjectStatus.UNFINISHED,
        weight: Weight.LOW,
        tags: [
            Tag.JAVA,
        ],
        github: '',
        slug: 'minecraft-plugin'
    },
    {
        title: 'A shoutout to all the projects I never finished!',
        description: `I 've got dozens of projects I've abandoned halfway through,
                      and even though I don't even remember half of them, they still helped me
                      get to where I am today.`,
        thumbnail: gif,
        status: ProjectStatus.UNFINISHED,
        weight: Weight.LOW,
        tags: [],
    },
];

const ProjectCard = ({ title, description, thumbnail, github, slug, tags, theme, status, index }: IProjectCard
    & { index: number }) => {
    const isReverse = index % 2 !== 0;

    return (
        <div block='ProjectCard' mods={{ REVERSE: isReverse }}>
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
                            <a href={github} target='_blank' rel="noopener noreferrer" >
                                <Icon.GitHub />
                            </a>
                        )}
                        {!!slug && (
                            <a href={`project/${slug}`}>
                                <Icon.Anchor />
                            </a>
                        )}
                    </div>
                </div>
                <div elem='Status'>
                    {status}
                </div>
            </div>
            <img
                elem='Thumbnail'
                src={thumbnail} />
        </div>
    );
};

export default ProjectCard;