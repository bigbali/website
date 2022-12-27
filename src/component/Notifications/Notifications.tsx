import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState
} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNotification } from 'Util';
import Icon from 'Component/Icon';
import './Notifications.module';

export enum NotificationStatus {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
};

export interface INotification {
    status: NotificationStatus,
    title: string,
    message: string,
    id: string,
    timeout: {
        id: NodeJS.Timeout,
        duration: number
    }
};

export const NotificationContext =
    createContext<[INotification[], Dispatch<SetStateAction<INotification[]>>]>([[], () => { }]);
export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
    return (
        <NotificationContext.Provider value={useState<INotification[]>([])}>
            {children}
        </NotificationContext.Provider>
    );
};

export const Notifications = () => {
    const [notificationContext] = useContext(NotificationContext);
    const [, hideNotification] = useNotification();
    const [containerRef] = useAutoAnimate<HTMLDivElement>({
        duration: 200
    });

    // Instead of creating a notification component and mapping that, we map directly
    // because this way the animations work better
    const notifications = notificationContext.map(({ title, message, status, id }) => {
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
                        hideNotification(id);
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
            mods={{ NO_CONTENT: notificationContext.length === 0 }}
        >
            {notifications}
        </div>
    );
};

export default Notifications;