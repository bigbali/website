import { SVGProps } from 'react';
import './Chevron.style';

export enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
    UP = 'up',
    DOWN = 'down',
}

export interface ChevronProps {
    direction?: Direction
}

export const Chevron = ({ direction = Direction.UP, ...props }: SVGProps<SVGSVGElement> & ChevronProps) => {
    return (
        <div block='Icon' elem='Chevron' mods={{
            DIRECTION_LEFT: direction === Direction.LEFT,
            DIRECTION_RIGHT: direction === Direction.RIGHT,
            DIRECTION_UP: direction === Direction.UP,
            DIRECTION_DOWN: direction === Direction.DOWN
        }}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                {...props}
            >
                {/* eslint-disable-next-line max-len */}
                <path d='M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z' />
            </svg>
        </div>
    );
};

export default Chevron;
