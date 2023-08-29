import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabinApi(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin succesfully edied!");
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isEditing,
    editCabin,
  };
};
