import { useQuery } from "@tanstack/react-query";
import { getUserById as getUserByIdApi } from "../../services/apiAuth";

export const useUserById = () => {
  const { isLoading: isLoadingUser, data: userById } = useQuery({
    queryKey: ["user"],
    queryFn: getUserByIdApi,
  });
  return {
    isLoadingUser,
    userById,
  };
};
