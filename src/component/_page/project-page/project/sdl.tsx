import Image from 'next/image';
import sdl from '@media/webp/sdl.webp';
import './project.style';

export default () => {
    return (
        <div>
            <div className="Row0">
                <h1>
                    Simple YouTube Video Downloader
                </h1>
                <Image alt="Simple YouTube Video Downloader" src={sdl} placeholder='blur' priority />
            </div>
        </div>
    );
};