import { SVGProps } from 'react';
import Base from '../_Base';

const Help = (props: SVGProps<SVGSVGElement>) => {
    return (
        <Base icon='Help'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                {...props}
            >
                {/* eslint-disable-next-line max-len */}
                <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm22,400a34.76,34.76,0,0,1-7.29,10.83A32.86,32.86,0,0,1,259.76,426a35,35,0,0,1-13.45,2.63A35.65,35.65,0,0,1,232.63,426a34.29,34.29,0,0,1-11.06-7.18A32.37,32.37,0,0,1,214.28,408a36.14,36.14,0,0,1,0-27A32.14,32.14,0,0,1,221.57,370a36.16,36.16,0,0,1,11.06-7.3A34.45,34.45,0,0,1,246.31,360a33.83,33.83,0,0,1,13.45,2.73A33.52,33.52,0,0,1,278,380.94a34.68,34.68,0,0,1,0,27ZM339.34,199.8a82.84,82.84,0,0,1-12.66,22A100.51,100.51,0,0,1,310.15,238q-8.89,6.84-16.87,12.88a132.41,132.41,0,0,0-13.79,11.86,23.37,23.37,0,0,0-7,13.1l-5.24,33.29H228.76L224.88,272a10.28,10.28,0,0,1-.23-1.94v-1.94a30.33,30.33,0,0,1,5-17.44,71.13,71.13,0,0,1,12.54-13.91q7.53-6.49,16.19-12.65a144.48,144.48,0,0,0,16.18-13.34,67,67,0,0,0,12.54-16.3q5-9.12,5-21.43a33.85,33.85,0,0,0-3.08-14.71,33.26,33.26,0,0,0-8.55-11.17A38.34,38.34,0,0,0,267.4,140a52.73,52.73,0,0,0-16.53-2.51q-13,0-22,2.85a81.4,81.4,0,0,0-15.28,6.38q-6.27,3.54-10.6,6.39t-7.75,2.85q-8.2,0-11.86-6.84l-14.82-23.49a158.84,158.84,0,0,1,17-13,121.41,121.41,0,0,1,19.95-10.72,124.27,124.27,0,0,1,23.26-7.18,132.31,132.31,0,0,1,27.13-2.62A113,113,0,0,1,292,97.54,81.39,81.39,0,0,1,320,113.16a69.64,69.64,0,0,1,18,24.51,78.39,78.39,0,0,1,6.38,32.15Q344.35,187.15,339.34,199.8Z" />                    </svg>
        </Base>
    );
};

export default Help;
