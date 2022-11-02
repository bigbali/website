import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { useDevice } from 'Util';
import Icon from 'Component/Icon';
import Transition from 'Component/Transition';
import './Cookies.style';

export const Cookies = () => {
    const isCookiesNoticeClosed = localStorage.getItem('is_cookies_notice_closed');
    const [isClosed, setIsClosed] = useState(false);
    const { isMobile } = useDevice();
    const ref = useRef(null);

    const cookiesAccept = () => {

    };

    const cookiesDecline = () => {

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
                        <div elem='Header'>
                            You have a choice
                            <div elem='Close'>
                                <button
                                    elem='CloseButton'
                                    onClick={() => {
                                        localStorage.setItem('is_cookies_notice_closed', 'true');
                                        setIsClosed(true);
                                    }}>
                                    <Icon.Close />
                                </button>
                            </div>
                        </div>
                        <div elem='Body'>
                            <div elem='Body-Left'>
                                I utilize your browser’s built-in storage system to store some data in order
                                to improve your experience while browsing this site.
                                <br />
                                You can read more about my&nbsp;
                                <Link
                                    elem='CookiePolicy'
                                    to='cookie-policy'
                                    target='_blank'
                                >
                                    cookie policy here.
                                </Link>
                            </div>
                            <div elem='Body-Right'>
                                <button elem='Accept' onClick={cookiesAccept}>
                                    Accept
                                </button>
                                <button elem='Decline' onClick={cookiesDecline}>
                                    Decline
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