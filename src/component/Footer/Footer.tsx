import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

console.log(style)

const Footer = () => {
    return (
        <div block='Footer'>
            <span elem='By'>
                Designed & Built by Balázs Burján,
                {process.env.REACT_APP_VERSION && (
                    <span>
                        version {process.env.REACT_APP_VERSION}
                    </span>
                )}
            </span>
            <nav elem='Navigation'>
                <Link to='cookie-policy'>
                    Cookie Policy
                </Link>
            </nav>
            <span elem='Date'>
                {(new Date).getFullYear()}
            </span>
        </div>
    );
};

export default Footer;