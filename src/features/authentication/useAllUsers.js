import { useQuery } from "@tanstack/react-query";
import { getAllUsers as getAllUsersApi } from "../../services/apiAuth";

const useAllUsers = () => {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  });
  return {
    isLoading,
    users,
    error,
  };
};

export default useAllUsers;
