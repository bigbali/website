import {
    useRef,
    useState
} from 'react';
import { TransitionGroup } from 'react-transition-group';
import Icon from 'Component/Icon';
import Transition from 'Component/Transition';
import Settings from 'Component/Settings';
import { NavigationElementProps } from '../nav.new';
import './navigation-mobile.style';

const NavigationMobile = ({ NavigationList }: NavigationElementProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const transitionRef = useRef();

    return (
        <TransitionGroup component={null}>
            <div
                block='Navigation'
                elem='Expander'
                onClick={() => setIsExpanded((state) => !state)}
            >
                <Icon.HamburgerMenu isExpanded={isExpanded} />
            </div>
            {isExpanded && (
                <Transition
                    in
                    appear
                    timeout={{
                        enter: 200,
                        exit: 100
                    }}
                    nodeRef={transitionRef}
                    classNames='Navigation'
                >
                    <div block='Navigation' elem='Menu'>
                        <div elem='MenuContent'>
                            <h1 elem='Heading'>
                                Menu
                            </h1>
                            {NavigationList}
                            <div elem='Settings'>
                                <Settings isMobile />
                            </div>
                        </div>
                        <div elem='Exit' onClick={() => setIsExpanded(false)}>
                            <Icon.Close />
                        </div>
                    </div>
                </Transition>
            )}
        </TransitionGroup>
    );
};

export default NavigationMobile;