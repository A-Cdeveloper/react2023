import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Hello,${data.user.email}. You are succesfully loged in!`);
      queryClient.setQueryData(["user"], data.user);
    },
    onSettled: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isLogin,
    login,
  };
};
