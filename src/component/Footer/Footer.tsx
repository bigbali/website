import Link from 'next/link';
import './Footer.style.scss';

// process.env.REACT_APP_VERSION => change to nextjs env var

const Footer = () => {
    return (
        <div block='Footer'>
            <span elem='By'>
                Designed & Built by Balázs Burján,
                <span>
                    version (placeholder 1.1.0)
                </span>
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