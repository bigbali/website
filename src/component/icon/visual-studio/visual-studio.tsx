import type { SVGProps } from 'react';
import Base from '../_base';

const VS = (props: SVGProps<SVGSVGElement>) => {
    return (
        <Base icon='VS'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                {...props}
            >
                {/* eslint-disable-next-line max-len */}
                <path d='M451.21,86.17,374.69,49.44c-7-3.39-13.29-6.84-21-6.84-5.67,0-10.4,1.76-15.61,6.63a14.49,14.49,0,0,0-1.7,1.63L335.3,52l-.15.17,0,.05C325.3,63.14,259,136.77,194.38,208.36l-91.23-74.88C98,129.25,95.75,128,92.47,128c-3,0-4.43.57-8.46,2.33-3.43,1.5-31.35,14-34.73,15.6s-6.19,4.71-6.57,17.32c0,.42,0,.86,0,1.32V342.91c0,.23,0,.45,0,.67.22,18.55,3.52,21.7,22.75,30.05C81,380.38,87.15,384,91.3,384c5,0,9.7-3.45,14.15-7.08l88.68-72.85c66.67,73.8,135.64,150.15,139.44,154.42a24,24,0,0,0,1.82,1.82.39.39,0,0,0,.06.11c3.6,3.8,8.78,8.91,16.62,8.91s14.12-3,24.1-7.54c7-3.2,50.16-24.2,75.2-36.4a32,32,0,0,0,18-28.76V115A31.92,31.92,0,0,0,451.21,86.17ZM68,347.88c10.92-11.95,28-30.71,28-30.71V195.45l55,60.91C112.05,299.5,79.26,335.7,68,347.88Zm294.67-1.39-110.14-90.4L362.67,165.6Z' />
            </svg>
        </Base>
    );
};

export default VS;
