import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schemes/register-schema";
import { loginUserThunk } from "@/store/features/auth/auth.thunk";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        const result = await dispatch(loginUserThunk(data));

        if (loginUserThunk.fulfilled.match(result)) {
            toast.success("Login successful!");
            router.push('/home');
        } else {
            const errorMessage = typeof result.payload === 'string'
                ? result.payload
                : "Invalid email or password";

            setError("root", {
                type: "server",
                message: errorMessage
            });
            toast.error(errorMessage);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        setError,
        onSubmit,
    };
};
