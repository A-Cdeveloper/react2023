import { useQuery } from "@tanstack/react-query";
import { getCurrentUser as getCurrentUserApi } from "../../services/apiAuth";

export const useUser = () => {
  const { isLoading: isLoadingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
  });
  return {
    isLoadingUser,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
};
