import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isInserting, mutate: createCabin } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin succesfully inserted!");
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isInserting,
    createCabin,
  };
};
