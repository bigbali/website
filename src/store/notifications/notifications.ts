import { create } from 'zustand';
import { v4 as UUIDV4 } from 'uuid';

export enum NotificationStatus {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

export type Notification = {
    status: NotificationStatus;
    title: string;
    message: string;
    id: string;
    timeout: {
        id: NodeJS.Timeout;
        duration: number;
    };
};

type NotificationPayload = {
    status: NotificationStatus;
    title: string;
    message: string;
    timeout: number;
};

type NotificationStore = {
    notifications: Notification[];
    show: (options: NotificationPayload) => string;
    hide: (id: string) => void;
};

export const useNotifications = create<NotificationStore>((set) => ({
    notifications: [],
    show: ({
        timeout = 5000,
        status = NotificationStatus.INFO,
        ...options
    }) => {
        const id = UUIDV4();

        set((state) => ({
            notifications: [
                ...state.notifications,
                {
                    ...options,
                    status,
                    id,
                    timeout: {
                        id: setTimeout(() => {
                            state.hide(id);
                        }, timeout),
                        duration: timeout
                    }
                }
            ]
        }));

        return id;
    },
    hide: (idToRemove) => {
        set((state) => {
            const notification = state.notifications.find(
                ({ id }) => id === idToRemove
            );

            if (!notification) return state;

            clearTimeout(notification.timeout.id);

            return {
                ...state,
                notifications: state.notifications.filter(
                    ({ id }) => idToRemove !== id
                )
            };
        });
    }
}));

export default useNotifications;
