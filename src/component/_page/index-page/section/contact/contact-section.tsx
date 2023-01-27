import { memo, RefObject, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
    NotificationStatus,
    useNotifications,
    useDevice,
    useSettings
} from '@store';
import Icon from '@component/icon';
import './contact-section.style';

const EMAIL = 'hello@balazsburjan.com';
const LINKEDIN = 'https://www.linkedin.com/in/balázs-burján-35456194/';
const GITHUB = 'https://github.com/bigbali';

const LinkedIn = dynamic(() => import('./linkedin'), { ssr: false });

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    }
    catch (e) {
        return false;
    }
};

const Contact = ({ refFromParent }: { refFromParent: RefObject<HTMLElement> }) => {
    const fontSize = useSettings(state => state.fontSize);
    const isMobile = useDevice(state => state.isMobile);
    const show = useNotifications(state => state.show);
    const contentRef = useRef<HTMLDivElement>(null);

    // 'mods' attribute didn't initially work, so here we go
    // (when fontSize modifier is too large, content is overflowing)
    useEffect(() => {
        const preventOverflow = isMobile && fontSize > 1.2;
        contentRef.current?.classList.toggle('REDUCE_WIDTH', preventOverflow);
    }, [fontSize, isMobile]);

    const handleCopy = (text: string) => {
        copyToClipboard(text)
            .then((didCopy) => {
                if (didCopy) {
                    show({
                        timeout: 5000,
                        status: NotificationStatus.SUCCESS,
                        title: 'Copied to clipboard',
                        message: `Copied to clipboard: ${text}.`
                    });
                }
                else {
                    show({
                        timeout: 5000,
                        status: NotificationStatus.ERROR,
                        title: 'Couldn\'t copy to clipboard',
                        message: `Couldn't copy to clipboard: ${text}.`
                    });
                }
            })
            .catch(() => { });
    };

    return (
        <section
            id='Contact'
            block='Contact'
            ref={refFromParent}
        >
            <div elem='Header'>
                <h1 className='animate-on-scroll'>
                    Reach out to me
                </h1>
                <p className='animate-on-scroll'>
                    <span>
                        feel free to say hello
                    </span>
                </p>
            </div>
            <div elem='Icons' className='animate-on-scroll'>
                <Icon.Message />
                <Icon.Message />
            </div>
            <div elem='Content' ref={contentRef}>
                <div>
                    <div elem='Content-Email' className='animate-on-scroll'>
                        <a href={`mailto:${EMAIL}`} target='_top' title={`Say Hello at ${EMAIL}`} role='button'>
                            SAY HELLO
                        </a>
                        <span>
                            {EMAIL}
                        </span>
                        <button title='Copy email address to clipboard' onClick={() => handleCopy(EMAIL)}>
                            <Icon.Copy />
                        </button>
                    </div>
                    <div elem='Content-LinkedIn' className='animate-on-scroll'>
                        <a href={LINKEDIN} target='_blank' rel='noopener noreferrer' title='Go to LinkedIn page'>
                            <Icon.LinkedIn />
                        </a>
                        {/* Need to load dynamically so Next.js doesn't complain for hydration mismatch */}
                        <LinkedIn isMobile={isMobile} text={LINKEDIN} />
                        <button title='Copy LinkedIn address to clipboard' onClick={() => handleCopy(LINKEDIN)}>
                            <Icon.Copy />
                        </button>
                    </div>
                    <div elem='Content-GitHub' className='animate-on-scroll'>
                        <a href={GITHUB} target='_blank' rel='noopener noreferrer' title='Go to GitHub page'>
                            <Icon.GitHub />
                        </a>
                        <span>
                            {GITHUB}
                        </span>
                        <button title='Copy GitHub address to clipboard' onClick={() => handleCopy(GITHUB)}>
                            <Icon.Copy />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Contact);