import Link from 'next/link';
import './Footer.style.scss';

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
                <Link href='cookie-policy'>
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