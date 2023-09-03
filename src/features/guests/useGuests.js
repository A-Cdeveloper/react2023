import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity as getStaysTodayActivityApi } from "../../services/apiBookings";

export const useGuests = () => {
  const {
    isLaoding,
    data: guests,
    count,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getStaysTodayActivityApi,
  });
  return {
    isLaoding,
    guests,
    count,
  };
};
