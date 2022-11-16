import { Link } from 'react-router-dom';
import './Footer.style';

const Footer = () => {
    return (
        <div block='Footer'>
            <span elem='By'>
                Designed & Built by Balázs Burján
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