import './NotFoundPage.style';

export const NotFoundPage = () => {
    return (
        <div block='NotFoundPage'>
            <div elem='MainContent'>
                <h1 elem='Header'>
                    I couldn't find the page you are looking for.
                </h1>
                <h2 elem='Subheader'>
                    Please make sure you got the right address.
                </h2>
            </div>
        </div>
    );
};

export default NotFoundPage;