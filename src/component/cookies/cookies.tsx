import { useState } from 'react';
import Link from 'next/link';
import { useDevice } from '@store';
import './cookies.style';

export const LOCAL_STORAGE_COOKIES_ACCEPTED = 'cookies_accepted';

export const Cookies = () => {
    const areCookiesAccepted = !!localStorage.getItem(
        LOCAL_STORAGE_COOKIES_ACCEPTED
    );
    const [isExpanded, setIsExpanded] = useState(!areCookiesAccepted);
    const { isMobile } = useDevice();

    const close = () => {
        localStorage.setItem(LOCAL_STORAGE_COOKIES_ACCEPTED, 'true');
        setIsExpanded(false);
    };

    if (!isExpanded) {
        return null;
    }

    return (
        <div block='Cookies'>
            <div elem='Body'>
                <div elem='Body-Left'>
                    <p>
                        I utilize your browser’s built-in storage system to
                        store some data in order to improve your experience
                        while browsing this site.
                        <span>
                            You can read more about my&nbsp;
                            {isMobile && <br />}
                            <Link
                                elem='CookiePolicy'
                                href='/cookie-policy'
                                target='_blank'
                            >
                                <wbr />
                                cookie policy here.
                            </Link>
                        </span>
                    </p>
                </div>
                <div elem='Body-Right'>
                    <button elem='Accept' onClick={close}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
