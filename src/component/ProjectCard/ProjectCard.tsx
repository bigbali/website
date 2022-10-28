import './ProjectCard.style';
import gif from '../../media/gif/gif.gif';

interface IProjectCard {
    title: string,
    description: string,
    thumbnail: string,
    github?: string,
    page?: string,
    theme?: string
};

export const projects: IProjectCard[] = [
    {
        title: 'The application you are currently browsing',
        description: `A web app to expose myself to the World Wide Web. It's built with React, using my own React Template
                      project as a foundation. It's hosted on GitHub Pages.`,
        thumbnail: gif,
        github: '',
        page: ''
    }
];

const ProjectCard = ({ title, description, thumbnail, github, page, theme }: IProjectCard) => {
    return (
        <div>ProjectCard</div>
    );
};

export default ProjectCard;