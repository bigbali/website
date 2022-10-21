import './ErrorPage.style';

export const ErrorPage = () => {
    return (
        <div block='ErrorPage' >
            <div elem='MainContent'>
                <h1 elem='Header'>
                    There's a fly in the soup
                </h1>
                <h2 elem='Subheader'>
                    Something's not right. It looks like we've caught an error!
                </h2>
            </div>
        </div>
    );
};

export default ErrorPage;