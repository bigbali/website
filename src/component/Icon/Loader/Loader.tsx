import { SVGProps } from 'react';
import Base from '../_Base';
import './Loader.style';

const Loader = (props: SVGProps<SVGSVGElement>) => {
    return (
        <Base icon='Loader'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 132 140'
                {...props}
            >
                {/* eslint-disable-next-line max-len */}
                <path d="M69.5 0.00174836C31.0702 0.270578 0 31.5069 0 70C0 108.66 31.3401 140 70 140C96.8014 140 120.085 124.938 131.847 102.816L116.224 93.8417C107.58 110.567 90.1253 122 70 122C41.2812 122 18 98.7188 18 70C18 41.448 41.0115 18.2707 69.5 18.0024V0.00174836Z" />
            </svg>
        </Base>
    );
};

export default Loader;
