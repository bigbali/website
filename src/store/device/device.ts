import { createSlice } from '@reduxjs/toolkit';
import getIsMobile from 'Util/getIsMobile';

export interface Device {
    isMobile: boolean,
    isDesktop: boolean
}

const isMobile = getIsMobile();
const initialState: Device = {
    isMobile,
    isDesktop: !isMobile
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        update() {
            const isMobile = getIsMobile();
            return {
                isMobile,
                isDesktop: !isMobile
            };
        }
    }
});

export default deviceSlice;