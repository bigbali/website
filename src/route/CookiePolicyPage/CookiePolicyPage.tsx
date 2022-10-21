import './CookiePolicyPage.style';

export const CookiePolicyPage = () => {
    return (
        <div block='CookiePolicyPage' >
            <div elem='MainContent'>
                <h1 elem='Header'>
                    Our Cookie Policy
                </h1>
                <p elem='TextContent'>
                    We use your browser's built-in storage to remember your settings and whether you have closed the Cookies notice,
                    therefore, we are by law obliged to notify our users.
                    These functionalities are implemented to enhance your browsing experience while using this page.
                    This storage is automatically used when you load the page, and if you wish to opt out, you can do so
                    by clearing your Cookies in your browser and leaving the page.
                </p>
            </div>
        </div>
    );
};

export default CookiePolicyPage;