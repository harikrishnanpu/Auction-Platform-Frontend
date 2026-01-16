import { useAppDispatch } from "@/store/hooks/hooks";
import {
  AdminLoginFormValues,
  adminLoginSchema,
} from "../schemes/login-schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserThunk } from "@/store/features/auth/auth.thunk";

export const useAdminLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    try {
      await dispatch(loginUserThunk(data)).unwrap();
      router.push("/admin/");
    } catch (error: unknown) {
      console.log(error);
      setError("root", {
        message: "Access Denied. Admin privileges required.",
      });
    }
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};
