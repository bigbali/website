import Icon from 'Component/Icon';
import { NotificationStatus } from 'Component/Notifications';
import { useNotification } from 'Util';
import './CookiePolicyPage.module';

export const CookiePolicyPage = () => {
    const [showNotification] = useNotification();

    const clearStorage = () => {
        localStorage.clear();
        showNotification({
            timeout: 5000,
            status: NotificationStatus.INFO,
            title: 'Browser Storage Cleared',
            message: 'The data I stored on your device has been deleted.'
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
                        whether or not you have accepted my cookie policy
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