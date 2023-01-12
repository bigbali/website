import { SVGProps } from 'react';
import Base from '../_Base';
import './BB.style';

const BB = (props: SVGProps<SVGSVGElement>) => {
    return (
        <Base icon='BB'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 158 128'
                {...props}
            >
                {/* eslint-disable-next-line max-len */}
                <path d="M21.6555 127.848C19.0955 127.592 17.0475 126.952 15.5115 125.928C14.1035 124.776 13.0155 123.368 12.2475 121.704C11.2235 120.552 10.5835 119.656 10.3275 119.016C10.1995 118.376 10.1995 117.8 10.3275 117.288C10.9675 117.288 11.5435 117.288 12.0555 117.288C12.5675 117.16 12.8875 116.904 13.0155 116.52C13.0155 116.136 13.2075 115.88 13.5915 115.752C14.1035 115.624 14.6155 115.624 15.1275 115.752C17.5595 115.88 20.5035 115.048 23.9595 113.256C27.5435 111.464 31.4475 108.968 35.6715 105.768C39.8955 102.44 44.1195 98.856 48.3435 95.016C51.6715 90.664 53.9755 87.464 55.2555 85.416C56.6635 83.368 57.3675 81.832 57.3675 80.808C57.4955 79.656 57.2395 78.504 56.5995 77.352C56.0875 76.328 54.8715 75.816 52.9515 75.816C51.0315 75.816 48.0875 77.096 44.1195 79.656C38.6155 83.112 34.1995 86.312 30.8715 89.256C27.5435 92.2 24.4715 95.528 21.6555 99.24C20.6315 100.52 19.4795 101.928 18.1995 103.464C17.0475 104.872 16.0235 106.088 15.1275 107.112C14.3595 108.136 13.9755 108.648 13.9755 108.648C13.9755 109.16 13.2075 109.8 11.6715 110.568C10.2635 111.336 9.0475 111.72 8.0235 111.72C7.5115 111.464 6.8075 111.016 5.9115 110.376C5.1435 109.608 4.6315 108.648 4.3755 107.496C3.2235 106.6 2.2635 105.832 1.4955 105.192C0.727501 104.424 0.343502 103.208 0.343502 101.544C0.343502 100.52 0.471501 99.24 0.727501 97.704C1.1115 96.168 1.6235 94.184 2.2635 91.752C3.0315 88.424 3.8635 84.968 4.7595 81.384C5.6555 77.672 6.4875 74.536 7.2555 71.976C8.1515 69.288 8.7915 67.816 9.1755 67.56C9.1755 67.56 9.4315 66.984 9.9435 65.832C10.4555 64.68 10.7115 63.336 10.7115 61.8C10.9675 60.264 11.3515 58.92 11.8635 57.768C12.5035 56.616 12.8235 55.784 12.8235 55.272C13.3355 54.888 14.1035 53.352 15.1275 50.664C16.1515 47.976 17.4315 44.456 18.9675 40.104C18.9675 39.72 19.4155 38.504 20.3115 36.456C21.2075 34.28 22.2955 31.784 23.5755 28.968C24.8555 26.024 26.1355 23.016 27.4155 19.944C28.8235 16.744 29.9755 13.928 30.8715 11.496C32.4075 9.32 33.6875 7.144 34.7115 4.96799C35.8635 2.66399 36.8875 1.31999 37.7835 0.935989C38.4235 0.807991 39.5115 1.06399 41.0475 1.70399C42.7115 2.34399 44.3755 3.17599 46.0395 4.19999C47.7035 5.224 48.8555 6.248 49.4955 7.272C49.8795 7.912 50.0715 8.552 50.0715 9.192C50.1995 9.832 49.9435 10.92 49.3035 12.456C48.6635 13.864 47.5755 16.232 46.0395 19.56C44.5035 22.76 42.3275 27.304 39.5115 33.192C35.9275 40.872 33.1115 47.272 31.0635 52.392C29.1435 57.512 27.5435 61.928 26.2635 65.64C25.1115 69.352 23.8955 72.872 22.6155 76.2L21.6555 80.424L26.6475 74.856C27.9275 73.576 29.2715 72.36 30.6795 71.208C32.0875 70.056 33.6235 68.904 35.2875 67.752C36.3115 66.984 37.6555 66.216 39.3195 65.448C41.1115 64.552 42.8395 63.784 44.5035 63.144C46.1675 62.504 47.3835 62.12 48.1515 61.992C48.5355 61.864 49.8155 61.608 51.9915 61.224C54.2955 60.712 56.5355 60.456 58.7115 60.456C61.5275 60.456 63.9595 61.48 66.0075 63.528C68.1835 65.448 70.1035 67.816 71.7675 70.632C73.1755 73.32 73.6875 76.776 73.3035 81C72.9195 85.096 71.8315 88.616 70.0395 91.56C69.3995 92.072 68.7595 92.776 68.1195 93.672C67.4795 94.44 67.1595 95.08 67.1595 95.592C67.0315 96.488 65.8795 98.344 63.7035 101.16C61.5275 103.848 59.3515 106.408 57.1755 108.84C54.8715 111.272 52.0555 113.704 48.7275 116.136C45.3995 118.44 42.0715 120.552 38.7435 122.472C35.5435 124.264 32.7915 125.544 30.4875 126.312C29.4635 126.44 27.9915 126.696 26.0715 127.08C24.1515 127.336 22.6795 127.592 21.6555 127.848ZM100.44 126.312C98.776 126.696 96.6 126.44 93.912 125.544C91.224 124.52 88.6 123.304 86.04 121.896C83.608 120.36 81.944 119.144 81.048 118.248C80.152 117.224 79.896 116.328 80.28 115.56C80.664 114.664 81.304 114.216 82.2 114.216C82.712 114.216 83.544 113.704 84.696 112.68C85.848 111.528 86.552 109.48 86.808 106.536C87.064 104.744 87.384 103.208 87.768 101.928C88.28 100.52 88.536 99.56 88.536 99.048C88.664 98.664 88.792 97.64 88.92 95.976C89.176 94.184 89.56 92.648 90.072 91.368C90.584 89.064 91.352 86.12 92.376 82.536C93.4 78.824 94.424 75.24 95.448 71.784C96.6 68.2 97.496 65.448 98.136 63.528C98.392 62.12 98.968 60.328 99.864 58.152C100.76 55.976 101.528 54.248 102.168 52.968C103.448 49.384 105.176 45.032 107.352 39.912C109.656 34.792 112.024 29.672 114.456 24.552C116.888 19.304 119 14.888 120.792 11.304C122.712 7.592 123.928 5.352 124.44 4.584C125.464 3.56 127.128 3.17599 129.432 3.43199C131.736 3.688 133.592 4.52 135 5.92799C136.152 7.33599 137.24 8.80799 138.264 10.344C139.288 11.88 139.032 13.544 137.496 15.336C136.984 16.232 136.152 17.64 135 19.56C133.848 21.352 132.952 22.696 132.312 23.592C131.288 26.664 130.008 29.672 128.472 32.616C127.064 35.56 125.528 38.888 123.864 42.6C122.2 46.184 120.408 50.664 118.488 56.04C117.336 58.472 116.376 60.904 115.608 63.336C114.84 65.64 114.2 67.112 113.688 67.752C112.92 70.568 112.088 72.68 111.192 74.088C110.424 75.496 109.784 77.736 109.272 80.808C109.272 80.808 109.912 80.168 111.192 78.888C112.6 77.608 114.264 76.008 116.184 74.088C121.176 68.712 125.656 64.616 129.624 61.8C133.592 58.984 137.24 57.512 140.568 57.384C142.36 57.256 144.28 57.704 146.328 58.728C148.504 59.752 150.488 61.032 152.28 62.568C154.072 63.976 155.288 65.512 155.928 67.176C156.952 69.48 157.464 72.488 157.464 76.2C157.464 79.784 156.888 83.496 155.736 87.336C154.712 91.176 153.048 94.568 150.744 97.512C149.336 99.944 147.608 102.312 145.56 104.616C143.64 106.792 141.976 108.392 140.568 109.416C139.288 110.568 138.008 111.72 136.728 112.872C135.576 113.896 134.616 114.728 133.848 115.368C132.184 116.52 130.84 117.416 129.816 118.056C128.792 118.568 127.384 119.144 125.592 119.784C122.904 121.704 119.192 123.112 114.456 124.008C109.72 124.904 105.048 125.672 100.44 126.312ZM105.24 111.72C106.136 111.72 107.736 111.528 110.04 111.144C112.472 110.76 114.712 109.8 116.76 108.264C122.776 105.192 127.576 101.8 131.16 98.088C134.872 94.376 137.496 90.664 139.032 86.952C140.568 83.24 141.208 79.912 140.952 76.968C140.696 74.024 139.096 73.128 136.152 74.28C133.336 75.304 128.92 78.824 122.904 84.84C120.088 87.4 117.656 89.832 115.608 92.136C113.56 94.44 111.448 96.872 109.272 99.432C108.376 100.84 107.48 101.992 106.584 102.888C105.816 103.656 105.368 104.552 105.24 105.576C104.344 109.672 104.344 111.72 105.24 111.72Z" />
            </svg>
        </Base>
    );
};

export default BB;
