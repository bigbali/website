import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
    NotificationStatus,
    useNotifications
} from '@store';
import Icon from '@component/icon';
import './notifications.style';

export const Notifications = () => {
    const { notifications, hide } = useNotifications();
    const [containerRef] = useAutoAnimate<HTMLDivElement>({
        duration: 200
    });

    const notificationElements = notifications.map(({ title, message, status, id }) => {
        return (
            <div
                key={id}
                block='Notification'
                mods={{
                    INFO: status === NotificationStatus.INFO,
                    SUCCESS: status === NotificationStatus.SUCCESS,
                    WARNING: status === NotificationStatus.WARNING,
                    ERROR: status === NotificationStatus.ERROR
                }}
            >
                <div elem='Content'>
                    <h3 elem='Title'>
                        {title}
                    </h3>
                    <p elem='Message'>
                        {message}
                    </p>
                </div>
                <button
                    elem='Close'
                    onClick={() => {
                        hide(id);
                    }}>
                    <Icon.Close />
                </button>
            </div>
        );
    });

    return (
        <div
            block='NotificationContainer'
            ref={containerRef}
            mods={{ NO_CONTENT: notifications.length === 0 }}
        >
            {notificationElements}
        </div>
    );
};

export default Notifications;