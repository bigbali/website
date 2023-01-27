import Icon from '@component/icon';
import {
    NotificationStatus,
    useNotifications
} from '@store';
import './cookie-policy-page.style';

export const CookiePolicyPage = () => {
    const show = useNotifications(state => state.show);

    const clearStorage = () => {
        localStorage.clear();
        show({
            timeout: 5000,
            status: NotificationStatus.INFO,
            title: 'Browser Storage Cleared',
            message: 'I deleted the data from your device. \
                      Please note that it will be automatically repopulated upon loading the page again.'
        });
    };

    return (
        <div block='CookiePolicyPage'>
            <div elem='Heading'>
                <h1>
                    Cookie Policy
                </h1>
                <Icon.Cookie />
            </div>
            <div elem='Content'>
                <p>
                    I utilize your browser’s built-in storage system to store the following data:
                </p>
                <ul>
                    <li>
                        whether you have accepted my cookie policy
                    </li>
                    <li>
                        settings, which are:
                        <ul>
                            <li>
                                color scheme preference
                            </li>
                            <li>
                                font size preference
                            </li>
                            <li>
                                contrast preference
                            </li>
                            <li>
                                accent color preference
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div elem='Clear'>
                <p>
                    If you no longer wish this data to be stored on your device, please click on the following button:
                </p>
                <button title='Clear Cookies' onClick={clearStorage}>
                    Clear Storage
                </button>
                <p>
                    When this page is loaded again, this data will be automatically repopulated.
                </p>
            </div>
        </div>
    );
};

export default CookiePolicyPage;