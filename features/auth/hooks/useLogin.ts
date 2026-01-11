import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schemes/register-schema";
import { loginUserThunk } from "@/store/features/auth/auth.thunk";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";

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
        try {
            await dispatch(loginUserThunk(data)).unwrap();
            router.push('/home');
        } catch (err) {
            console.error("Login Failed", err);
            setError("root", {
                type: "server",
                message: typeof err === 'string' ? err : "Invalid email or password"
            });
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
