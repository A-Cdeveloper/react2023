import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignUp = () => {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      //console.log(user);
      toast.success(
        `Account succesfully created. Pelase verify your email adresse`
      );
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isLoading,
    signup,
  };
};
