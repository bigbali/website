import { debounceTime, fromEvent } from 'rxjs';
import { create } from 'zustand';
import { getIsMobile, isClient } from '@util';

export interface Device {
    isMobile: boolean | undefined;
    isDesktop: boolean | undefined;
}

interface DeviceStore extends Device {
    update: () => void;
}

const isMobile = getIsMobile();
export const useDevice = create<DeviceStore>((set) => ({
    isMobile: isMobile,
    isDesktop: isClient ? !isMobile : undefined,
    update: () => {
        set(() => {
            const isMobile = getIsMobile();
            return {
                isMobile,
                isDesktop: !isMobile
            };
        });
    }
}));

const WINDOW_SIZE_UPDATE_DELAY_MS = 100;

if (isClient) {
    fromEvent(window, 'resize')
        .pipe(debounceTime(WINDOW_SIZE_UPDATE_DELAY_MS))
        .subscribe(() => {
            useDevice.getState().update();
        });
}

export default useDevice;
