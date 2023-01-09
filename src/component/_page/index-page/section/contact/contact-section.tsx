import { memo, RefObject } from 'react';
import {
    NotificationStatus,
    useNotifications
} from 'Store';
import { useDevice, useSettings } from 'Store';
import Icon from 'Component/Icon';
import './contact-section.style';

const EMAIL = 'hello@balazsburjan.com';
const LINKEDIN = 'https://www.linkedin.com/in/balázs-burján-35456194/';
const GITHUB = 'https://github.com/bigbali';

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
    const { fontSize } = useSettings();
    const { isMobile } = useDevice();
    const show = useNotifications(state => state.show);
    const preventOverflow = isMobile && fontSize > 1.2;

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
            <div elem='Content' mods={{ REDUCE_WIDTH: preventOverflow }}>
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
                        <span>
                            {LINKEDIN.slice(0, 27)}
                            <wbr /> {/* We really do need to break the line on mobile, it appears */}
                            {LINKEDIN.slice(27)}

                        </span>
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