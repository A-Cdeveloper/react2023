import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity as getStaysTodayActivityApi } from "../../services/apiBookings";

export const useTodayActivity = () => {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivityApi,
  });
  return {
    isLoading,
    activities,
  };
};
