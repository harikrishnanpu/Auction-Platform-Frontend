import { useForm } from "react-hook-form";
import { forgotPasswordSchema, ForgotPasswordValues } from "../schems/forget-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useState } from "react";
import { forgotPasswordThunk } from "@/store/features/auth/auth.thunk";





export const useResetPassword = () => {
    const [isSent, setIsSent] = useState(false);
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: ForgotPasswordValues) => {
        try {

            const response = await dispatch(forgotPasswordThunk({ email: data.email })).unwrap();
            setIsSent(true);
            return response;

        } catch (err) {

            console.log("Forgot Password Error:", err);
            setError('email', { type: 'manual', message: typeof err === 'string' ? err : 'Failed to send reset link' });
            
        }
    };


    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        isSent
    }

}