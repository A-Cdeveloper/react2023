import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();

  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success(`You are succesfully loged in!`);
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isLogin,
    login,
  };
};
