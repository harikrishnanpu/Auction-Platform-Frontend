import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import adminAuthReducer from './features/admin/auth/admin-auth.slice';
import adminReducer from './features/admin/auth/admin.slice';


export const makeStore = () => {

    return configureStore({
        reducer: {
            auth: authReducer,
            adminAuth: adminAuthReducer,
            admin: adminReducer,
        },
    });

}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
