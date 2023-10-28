import './footer.style.scss';

const Footer = () => {
    return (
        <div block='Footer'>
            <span elem='By'>
                designed and built by Balázs Burján,
                <span>
                    version {process.env.NEXT_PUBLIC_VERSION}
                </span>
            </span>
            <nav elem='Navigation'>
            </nav>
            <span elem='Date'>
                {(new Date).getFullYear()}
            </span>
        </div>
    );
};

export default Footer;