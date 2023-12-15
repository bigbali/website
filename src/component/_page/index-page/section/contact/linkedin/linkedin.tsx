export type LinkedInURLProps = {
    isMobile: boolean | undefined;
    text: string;
};

const linkedInURL = ({ isMobile, text }: LinkedInURLProps) => {
    if (isMobile) {
        return (
            <span>
                {' '}
                {/* <wbr> causes <span> to take full width, so use <br> */}
                {text.slice(0, 27)} <br /> {text.slice(27)}
            </span>
        );
    }

    return <span>{text}</span>;
};

export default linkedInURL;
