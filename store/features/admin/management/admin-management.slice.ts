import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getUsersThunk,
    getUserByIdThunk,
    getSellersThunk,
    getSellerByIdThunk,
    getAdminStatsThunk
} from './admin-management.thunk';

interface AdminState {
    users: {
        users: any[];
        total: number;
        page: number;
        totalPages: number;
        isLoading: boolean;
        error: string | null;
    };
    userDetail: {
        user: any | null;
        isLoading: boolean;
        error: string | null;
    };
    sellers: {
        sellers: any[];
        total: number;
        page: number;
        totalPages: number;
        isLoading: boolean;
        error: string | null;
    };
    sellerDetail: {
        seller: any | null;
        isLoading: boolean;
        error: string | null;
    };
    stats: {
        data: {
            totalUsers: number;
            pendingKyc: number;
            activeSellers: number;
            suspendedUsers: number;
        } | null;
        isLoading: boolean;
        error: string | null;
    };
}

const initialState: AdminState = {
    users: {
        users: [],
        total: 0,
        page: 1,
        totalPages: 1,
        isLoading: false,
        error: null,
    },
    userDetail: {
        user: null,
        isLoading: false,
        error: null,
    },
    sellers: {
        sellers: [],
        total: 0,
        page: 1,
        totalPages: 1,
        isLoading: false,
        error: null,
    },
    sellerDetail: {
        seller: null,
        isLoading: false,
        error: null,
    },
    stats: {
        data: null,
        isLoading: false,
        error: null,
    },
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearUserDetail: (state) => {
            state.userDetail = initialState.userDetail;
        },
        clearSellerDetail: (state) => {
            state.sellerDetail = initialState.sellerDetail;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminStatsThunk.pending, (state) => {
                state.stats.isLoading = true;
                state.stats.error = null;
            })
            .addCase(getAdminStatsThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.stats.isLoading = false;
                state.stats.data = action.payload;
            })
            .addCase(getAdminStatsThunk.rejected, (state, action) => {
                state.stats.isLoading = false;
                state.stats.error = action.payload as string;
            })
        // Users
        builder
            .addCase(getUsersThunk.pending, (state) => {
                state.users.isLoading = true;
                state.users.error = null;
            })
            .addCase(getUsersThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.users.isLoading = false;
                state.users.users = action.payload.users || [];
                state.users.total = action.payload.total || 0;
                state.users.page = action.payload.page || 1;
                state.users.totalPages = action.payload.totalPages || 1;
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.users.isLoading = false;
                state.users.error = action.payload as string;
            })
            // User Detail
            .addCase(getUserByIdThunk.pending, (state) => {
                state.userDetail.isLoading = true;
                state.userDetail.error = null;
            })
            .addCase(getUserByIdThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.userDetail.isLoading = false;
                state.userDetail.user = action.payload;
            })
            .addCase(getUserByIdThunk.rejected, (state, action) => {
                state.userDetail.isLoading = false;
                state.userDetail.error = action.payload as string;
            })
            .addCase(getSellersThunk.pending, (state) => {
                state.sellers.isLoading = true;
                state.sellers.error = null;
            })
            .addCase(getSellersThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.sellers.isLoading = false;
                state.sellers.sellers = action.payload.sellers || action.payload.users || [];
                state.sellers.total = action.payload.total || 0;
                state.sellers.page = action.payload.page || 1;
                state.sellers.totalPages = action.payload.totalPages || 1;
            })
            .addCase(getSellersThunk.rejected, (state, action) => {
                state.sellers.isLoading = false;
                state.sellers.error = action.payload as string;
            })
            .addCase(getSellerByIdThunk.pending, (state) => {
                state.sellerDetail.isLoading = true;
                state.sellerDetail.error = null;
            })
            .addCase(getSellerByIdThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.sellerDetail.isLoading = false;
                state.sellerDetail.seller = action.payload;
            })
            .addCase(getSellerByIdThunk.rejected, (state, action) => {
                state.sellerDetail.isLoading = false;
                state.sellerDetail.error = action.payload as string;
            })
    },
});

export const { clearUserDetail, clearSellerDetail } = adminSlice.actions;
export default adminSlice.reducer;
