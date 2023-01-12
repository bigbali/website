import type { IconProps } from '../index';
import Base from '../_Base';
import './HamburgerMenu.style';

const HamburgerMenu = ({ color, isExpanded = false }: IconProps & { isExpanded?: boolean }) => {
    return (
        <Base icon='HamburgerMenu' modifiers={{ isExpanded }}>
            <svg
                viewBox='0 0 72 48'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M0 48H72V40H0V48ZM0 28H72V20H0V28ZM0 0V8H72V0H0Z'
                    fill={color}
                />
            </svg>
        </Base>
    );
};

export default HamburgerMenu;