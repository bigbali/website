// bem-attr-skip-file
import { forwardRef, useEffect, useRef } from 'react';
import { useLocation, useResolvedPath } from 'react-router';
import { Link, NavLinkProps } from 'react-router-dom';
import { useDevice } from 'Util';

type NavigationProps = {
    onActive?: (currentlyActive: string) => void,
    onInactive?: () => void,
    onActiveReselected?: (id: string, isMobile: boolean) => void,
    name?: string
};

/**
 * A customised version of react-router's NavLink.
 */
export const NavigationLink = forwardRef<HTMLAnchorElement, NavLinkProps & NavigationProps>(function NavigationLink({
    'aria-current': ariaCurrentProp = 'page',
    caseSensitive = false,
    className: classNameProp = '',
    end = false,
    style: styleProp,
    to,
    children,
    name,
    onActive,
    onInactive,
    onActiveReselected,
    ...rest
}, ref) {
    const location = useLocation();
    const path = useResolvedPath(to);
    const previouslyActive = useRef(false);
    const { isMobile } = useDevice();

    const locationPathname = caseSensitive
        ? location.pathname
        : location.pathname.toLowerCase();
    const toPathname = caseSensitive
        ? path.pathname
        : path.pathname.toLowerCase();

    const isActive = locationPathname === toPathname
        || (!end
            && locationPathname.startsWith(toPathname)
            && locationPathname.charAt(toPathname.length) === '/');

    const ariaCurrent = isActive
        ? ariaCurrentProp
        : undefined;

    const className = (typeof classNameProp === 'function')
        ? classNameProp({ isActive, isPending: false })
        : [classNameProp, isActive ? 'active' : null]
            .filter(Boolean)
            .join(' ');

    const style = typeof styleProp === 'function'
        ? styleProp({ isActive, isPending: false })
        : styleProp;

    if (onActive && isActive && previouslyActive.current === false) {
        onActive(location.pathname.substring(1) || 'index');
    }

    if (onInactive && !isActive && previouslyActive.current === true) {
        onInactive();
    }

    if (onActiveReselected && name && isActive && previouslyActive.current === true) {
        onActiveReselected(name, isMobile);
    }

    useEffect(() => {
        if (previouslyActive.current !== isActive) {
            previouslyActive.current = isActive;
        }
    }, [isActive]);

    return (
        <Link
            {...rest}
            aria-current={ariaCurrent}
            className={previouslyActive.current ? className?.concat(' previouslyactive').trim() : className}
            ref={ref}
            style={style}
            to={to}
            id={name}
        >
            {
                typeof children === 'function'
                    ? children({ isActive, isPending: false })
                    : children
            }
        </Link>
    );
}
);


export default NavigationLink;
