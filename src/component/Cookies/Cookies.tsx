import { useRef, useState } from 'react';
import Link from 'next/link';
import { TransitionGroup } from 'react-transition-group';
import { useDevice } from 'Store';
import Transition from 'Component/Transition';
import './Cookies.style';

export const Cookies = () => {
    const isCookiesNoticeClosed = localStorage.getItem('is_cookies_notice_closed');
    const [isClosed, setIsClosed] = useState(false);
    const { isMobile } = useDevice();
    const ref = useRef(null);

    const close = () => {
        localStorage.setItem('is_cookies_notice_closed', 'true');
        setIsClosed(true);
    };

    return (
        <TransitionGroup component={null}>
            {!(isCookiesNoticeClosed || isClosed) &&
                <Transition
                    nodeRef={ref}
                    classNames='Cookies'
                    timeout={{
                        enter: 700,
                        exit: 200
                    }}
                    in
                    appear
                >
                    <div block='Cookies' ref={ref}>
                        <div elem='Body'>
                            <div elem='Body-Left'>
                                <p>
                                    I utilize your browser’s built-in storage system to store some data in order
                                    to improve your experience while browsing this site.
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
                </Transition>
            }
        </TransitionGroup>
    );
};

export default Cookies;