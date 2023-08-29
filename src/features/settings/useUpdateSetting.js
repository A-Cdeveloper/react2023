import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingsApi } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, mutate } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings succesfully updated!");
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    isLoading,
    error,
    mutate,
  };
};
