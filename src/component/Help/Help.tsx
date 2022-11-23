import Icon from 'Component/Icon';
import './Help.style';

type HelpProps = {
    content: string
};

export const Help = ({ content }: HelpProps) => {
    return (
        <div block='Help'>
            <div elem='Content' dangerouslySetInnerHTML={{ __html: content }} />
            <Icon.Help />
        </div>
    );
};

export default Help;