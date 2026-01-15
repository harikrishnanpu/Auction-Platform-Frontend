
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../schemes/register-schema";
import { useRouter } from "next/navigation";
import { registerUserThunk } from "@/store/features/auth/auth.thunk";
import { useAppDispatch } from "@/store/hooks/hooks";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await dispatch(registerUserThunk(data)).unwrap();
      router.push(`/email?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      console.log("Registration Failed", err);
      setError("root", {
        type: "server",
        message: typeof err === 'string' ? err : "Registration failed. Please try again."
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