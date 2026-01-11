

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../schemes/register-schema";
import { useState } from "react";

export const useRegister = () => {
    
  const [isLoading, setIsLoading] = useState(false);

  const {
        register,
        handleSubmit,
        setError,
        formState,
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            terms: undefined,
        },
    });




  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);

      

      

    } catch (err) {



      console.log("Registration Failed", err);

    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    formState,
    setError,
    onSubmit,   
    isLoading,  
  };
    
    
};