"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { getSellersThunk, blockSellerThunk } from "@/store/features/admin/auth/admin.thunk";
import { SellerTable } from "./seller-table";

export function SellerManagementView() {
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(1);
    
    const sellers = useAppSelector((state: any) => state.admin?.sellers?.sellers || []);
    const loading = useAppSelector((state: any) => state.admin?.sellers?.isLoading || false);
    const totalPages = useAppSelector((state: any) => state.admin?.sellers?.totalPages || 1);
    const totalSellers = useAppSelector((state: any) => state.admin?.sellers?.total || 0);

    React.useEffect(() => {
        dispatch(getSellersThunk({ page, limit: 10 }));
    }, [page, dispatch]);

    const handleBlockSeller = async (id: string, block: boolean) => {
        try {
            await dispatch(blockSellerThunk({ id, block })).unwrap();
            dispatch(getSellersThunk({ page, limit: 10 }));
        } catch (error) {
            console.log("Failed to block/unblock seller", error);
        }
    };

    return (
        <div className="font-sans transition-colors duration-300 bg-background text-foreground animate-in fade-in duration-500">
            <div className="mb-8">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
                        <ArrowLeft size={14} />
                        Dashboard
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground font-medium">Seller Management</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
                            Seller Management
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage sellers, KYC verification, and seller roles.
                        </p>
                    </div>
                </div>
            </div>

            <SellerTable
                sellers={sellers}
                loading={loading}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalSellers={totalSellers}
                onBlockSeller={handleBlockSeller}
            />
        </div>
    );
}
