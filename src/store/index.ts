import { configureStore } from '@reduxjs/toolkit';
import deviceSlice from './device/device';
import settingsSlice from './settings/settings';

export * from './device/device';
export * from './settings/settings';

export const store = configureStore({
    reducer: {
        device: deviceSlice.reducer,
        settings: settingsSlice.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // allow callbacks as payload
    })
});

export default store;

export type DISPATCH = typeof store.dispatch;
export type ROOTSTATE = ReturnType<typeof store.getState>;
