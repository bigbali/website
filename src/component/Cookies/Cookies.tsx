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

    const tapOrClick = isMobile ? 'Tap' : 'Click';

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
                            Cookies notice
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
                            We must inform you that we are using cookies to
                            ensure your experience browsing this page is nothing less than amazing.
                            <br />
                            By continuing to browse this page, you automatically agree to our cookie policy.
                            <br />
                            <Link
                                elem='CookiePolicy'
                                to='cookie-policy'
                                target='_blank'
                            >
                                {tapOrClick} here to read about our Cookie Policy.
                            </Link>
                        </div>
                    </div>
                </Transition>
            }
        </TransitionGroup>
    );
};

export default Cookies;