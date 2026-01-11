import { RegisterFormValues } from "@/features/auth/schemes/register-schema";
import api from "@/lib/axios";
import { RegisterResponse } from "@/store/types/apiTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const registerUserThunk = createAsyncThunk(
    'auth/register',
    async (userData: RegisterFormValues, { rejectWithValue }): Promise<RegisterResponse | any> => {
        try {
            const data = await api.post('/auth/register', userData);
            return data.data;
        } catch (err) {
            return rejectWithValue((err as any).response.data);
        }

    }
);