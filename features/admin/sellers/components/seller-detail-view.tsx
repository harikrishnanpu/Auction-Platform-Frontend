"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Ban, CheckCircle, Clock, FileText } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { assignSellerRoleThunk, blockSellerThunk, getSellerByIdThunk, verifySellerKycThunk } from "@/store/features/admin/management/admin-management.thunk";

export function SellerDetailView() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const seller = useAppSelector((state: any) => state.admin?.sellerDetail?.seller);
    const loading = useAppSelector((state: any) => state.admin?.sellerDetail?.isLoading);
    const error = useAppSelector((state: any) => state.admin?.sellerDetail?.error);

    React.useEffect(() => {
        if (params.id) {
            dispatch(getSellerByIdThunk(params.id as string));
        }
    }, [params.id, dispatch]);

    const handleVerifyKyc = async (verify: boolean) => {
        if (!seller) return;
        try {
            await dispatch(verifySellerKycThunk({ id: seller.id, verify })).unwrap();
            dispatch(getSellerByIdThunk(seller.id));
        } catch (error) {
            console.log("Failed to verify KYC", error);
        }
    };

    const handleBlock = async () => {
        if (!seller) return;
        try {
            await dispatch(blockSellerThunk({ id: seller.id, block: !seller.is_blocked })).unwrap();
            dispatch(getSellerByIdThunk(seller.id));
        } catch (error) {
            console.log("Failed to block/unblock seller", error);
        }
    };

    const handleAssignRole = async () => {
        if (!seller) return;
        try {
            await dispatch(assignSellerRoleThunk(seller.id)).unwrap();
            dispatch(getSellerByIdThunk(seller.id));
        } catch (error) {
            console.log("Failed to assign seller role", error);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center dark:text-white">Loading...</div>;
    }

    if (error || !seller) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Seller not found'}</div>;
    }

    const formatDate = (dateString: string | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <span
                                onClick={() => router.back()}
                                className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
                            >
                                <ArrowLeft size={14} /> Sellers
                            </span>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 dark:text-white font-medium">Seller #{seller.id.substring(0, 8)}</span>
                        </nav>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            {seller.name}
                            {seller.kyc_status === 'VERIFIED' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-sans font-bold tracking-wide uppercase border border-green-200 dark:border-green-800">
                                    KYC Verified
                                </span>
                            )}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBlock}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-red-600 dark:text-red-400"
                        >
                            <Ban size={18} />
                            {seller.is_blocked ? 'Unblock' : 'Block'}
                        </button>
                        {seller.kyc_status !== 'VERIFIED' && seller.kyc_profile && (
                            <>
                                <button
                                    onClick={() => handleVerifyKyc(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                                >
                                    <CheckCircle size={18} />
                                    Approve KYC
                                </button>
                                <button
                                    onClick={() => handleVerifyKyc(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                                >
                                    <Ban size={18} />
                                    Reject KYC
                                </button>
                            </>
                        )}
                        {!seller.roles.includes('SELLER') && (
                            <button
                                onClick={handleAssignRole}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Assign Seller Role
                            </button>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-xl text-sm font-medium hover:bg-gray-900 shadow-lg shadow-black/20 transition-all">
                            <Edit size={18} />
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Seller Information</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Email</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{seller.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Phone</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{seller.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Address</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{seller.address}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Joined</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(seller.joined_at)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">KYC Status</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-2">Verification Status</p>
                                {seller.kyc_status === 'VERIFIED' ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                        <CheckCircle size={12} />
                                        Verified
                                    </span>
                                ) : seller.kyc_status === 'PENDING' ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                                        <Clock size={12} />
                                        Pending
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
                                        Not Submitted
                                    </span>
                                )}
                            </div>
                            {seller.kyc_profile && (
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-2">Document Type</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{seller.kyc_profile.document_type}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    {seller.kyc_profile && (
                        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FileText size={20} />
                                KYC Documents
                            </h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase mb-2">Metadata</p>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Document Number</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{seller.kyc_profile.document_number}</p>
                                            </div>
                                            {seller.kyc_profile.address && (
                                                <div>
                                                    <p className="text-xs text-gray-500">Address on Document</p>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{seller.kyc_profile.address}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        {/* Placeholder for Liveness if we had it separately, for now relying on images */}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Uploaded Images</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {seller.kyc_profile.id_front_url && (
                                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                                                <p className="text-xs text-gray-500 mb-2">ID Front</p>
                                                <img src={seller.kyc_profile.id_front_url} alt="ID Front" className="w-full h-auto rounded-md object-contain max-h-64" />
                                            </div>
                                        )}
                                        {seller.kyc_profile.id_back_url && (
                                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                                                <p className="text-xs text-gray-500 mb-2">ID Back</p>
                                                <img src={seller.kyc_profile.id_back_url} alt="ID Back" className="w-full h-auto rounded-md object-contain max-h-64" />
                                            </div>
                                        )}
                                        {seller.kyc_profile.address_proof_url && (
                                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                                                <p className="text-xs text-gray-500 mb-2">Address Proof</p>
                                                <img src={seller.kyc_profile.address_proof_url} alt="Address Proof" className="w-full h-auto rounded-md object-contain max-h-64" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
