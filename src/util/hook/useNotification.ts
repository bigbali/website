import {
    useCallback,
    useContext,
    useRef
} from 'react';
import { v4 as UUIDV4 } from 'uuid';
import {
    NotificationContext,
    NotificationStatus,
} from 'Component/Notifications/Notifications';

type ShowNotificationPayload = {
    status: NotificationStatus,
    title: string,
    message: string,
    timeout: number
};

/**
 * @returns a tuple containing a function to create a notification, and one to delete it.
 */
export const useNotification = () => {
    const [notificationContext, updateNotificationContext] = useContext(NotificationContext);
    const notificationContextRef = useRef(notificationContext);
    notificationContextRef.current = notificationContext; // we'll use this to avoid using the stale value from the closures below

    /**
     * Creates a new notification and adds it to the existing ones.
     * @return the ID of the created notification.
     */
    const showNotification = useCallback(
        ({ timeout = 5000, status = NotificationStatus.INFO, ...options }: ShowNotificationPayload): string => {
            const id = UUIDV4();

            updateNotificationContext((state) => [
                ...state,
                {
                    ...options,
                    status,
                    id,
                    timeout: {
                        id: setTimeout(() => {
                            hideNotification(id);
                        }, timeout),
                        duration: timeout
                    }
                }
            ]);

            return id;
        }, []);

    /**
     * Removes a notification by ID.
     * @param notificationId the ID returned by `showNotification`.
     */
    const hideNotification = useCallback((notificationId: string) => {
        if (!notificationId) return;

        // remove notification and clear the timeout
        updateNotificationContext((context) => {
            // get the id an duration properties of the notification that matches the provided ID
            const notification = context.filter(({ id }) => id === notificationId);

            if (notification.length !== 0) {
                const { timeout: { id, duration } } = notification[0];

                if (duration !== 0) { // ...then use them to clear the timeout
                    clearTimeout(id);
                }
            }

            return context.filter(({ id }) => notificationId !== id);
        });
    }, []);

    return [
        showNotification,
        hideNotification
    ] as const;
};

export default useNotification;