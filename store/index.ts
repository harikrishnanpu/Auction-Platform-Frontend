import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import adminReducer from './features/admin/management/admin-management.slice';


export const makeStore = () => {

    return configureStore({
        reducer: {
            auth: authReducer,
            admin: adminReducer,
        },
    });

}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
