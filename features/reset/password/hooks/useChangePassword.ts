import { useAppDispatch } from "@/store/hooks/hooks";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordValues } from "../schems/change-password.schema";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordThunk } from "@/store/features/auth/auth.thunk";
import { zodResolver } from "@hookform/resolvers/zod";




export const useChangePassword = () => {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    

    const token = searchParams.get('token');
    const email = searchParams.get('email');


    const router = useRouter();


    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<ResetPasswordValues>({
          resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: "", confirmPassword: ""},
    });


    const onSubmit = async (data: ResetPasswordValues) => {
        try {
            const response = await dispatch(resetPasswordThunk({ newPassword: data.newPassword, token: token as string, email: email as string })).unwrap();
            if (response.success) {
                toast.success("Password reset successfully! Please login.");
                router.push("/login");
            } else {
                console.log(response.message);
                setError('root', { type: 'manual', message: response.message })
            }
        } catch (error: unknown) {
            console.log(error);
            setError('root', { type: 'manual', message: 'Failed to reset password'} )
        }
    };



    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit

    }


}