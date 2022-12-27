import Icon from 'Component/Icon';
import './Help.module';

export enum Orientation {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    ABOVE = 'ABOVE',
    BELOW = 'BELOW',
}

type HelpProps = {
    content: string,
    orientation?: Orientation
};

export const Help = ({ content, orientation }: HelpProps) => {
    return (
        <div block='Help'>
            <div
                elem='Content'
                mods={(prefix: string) => `${prefix}${orientation || Orientation.ABOVE}`}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <Icon.Help />
        </div>
    );
};

export default Help;