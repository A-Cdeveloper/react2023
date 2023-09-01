import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      //console.log(user);
      queryClient.invalidateQueries(["users"]);
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
