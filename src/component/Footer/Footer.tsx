import Link from 'next/link';
import './Footer.style.scss';

const Footer = () => {
    return (
        <div block='Footer'>
            <span elem='By'>
                Designed & Built by Balázs Burján,
                <span>
                    {process.env.NEXT_PUBLIC_VERSION}
                </span>
            </span>
            <nav elem='Navigation'>
                <Link href='/cookie-policy' scroll={false}>
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