import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import adminAuthReducer from './features/admin/admin-auth.slice';


export const makeStore = () => {

    return configureStore({
        reducer: {
            auth: authReducer,
            adminAuth: adminAuthReducer,
        },
    });

}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
