import { debounceTime, fromEvent } from 'rxjs';
import create from 'zustand';

// BUG?: apparently, this module resolves correctly, but at runtime we get the error message
// that says we're trying to access undefined.getIsMobile.
// When the entire module is logged to console (import * as Module from 'Util'), it's all fine looking.
// import { getIsMobile } from 'Util'; // so, this is not working (as a matter of fact, nothing of 'Util' does)
import { getIsMobile } from 'Util/getIsMobile';

export interface Device {
    isMobile: boolean,
    isDesktop: boolean
};

interface DeviceStore extends Device {
    update: () => void
};

const isMobile = getIsMobile();
export const useDevice = create<DeviceStore>((set) => ({
    isMobile: isMobile,
    isDesktop: !isMobile,
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

fromEvent(window, 'resize')
    .pipe(
        debounceTime(WINDOW_SIZE_UPDATE_DELAY_MS),
    )
    .subscribe(() => {
        useDevice.getState().update();
    });

export default useDevice;