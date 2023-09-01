import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success(`User was updated`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isLoading,
    updateUser,
  };
};
