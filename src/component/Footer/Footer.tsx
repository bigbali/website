import { Link } from 'react-router-dom';
import './Footer.style';

const Footer = () => {
    return (
        <div block='Footer'>
            <span elem='By'>
                React Template by Balázs Burján
            </span>
            <nav elem='Navigation'>
                <Link to='cookie-policy'>
                    Cookie Policy
                </Link>
                <Link to='terms-of-use'>
                    Terms of Use
                </Link>
            </nav>
            <span elem='Date'>
                {(new Date).getFullYear()}
            </span>
        </div>
    );
};

export default Footer;