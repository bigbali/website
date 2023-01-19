import { SVGProps } from 'react';
import Base from '../_Base';

const VSCode = (props: SVGProps<SVGSVGElement>) => {
    return (
        <Base icon='VSCode'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                {...props}
            >
                {/* eslint-disable-next-line max-len */}
                <path d="M448.21,88.43,354.13,44.27v0a13.66,13.66,0,0,0-15.74,3.62L167.31,204.34,96,150.44c-7.78-5.69-18.09-5.05-25.94.55-5.11,3.64-19.23,16.79-19.23,16.79a21.33,21.33,0,0,0-1.14,32.34L110.81,256,49.69,311.88a21.33,21.33,0,0,0,1.14,32.34S65,357.37,70.06,361c7.85,5.6,18.16,6.24,25.94.55l71.31-53.9L338.4,464.07a13.66,13.66,0,0,0,15.74,3.62v0l94.08-44.16a31.78,31.78,0,0,0,21.12-30.08v-275A31.78,31.78,0,0,0,448.21,88.43ZM362.67,352l-127-96,127-96Z" />
            </svg>
        </Base>
    );
};

export default VSCode;
