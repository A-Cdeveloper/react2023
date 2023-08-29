import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : // : {
        //     multyFilter: [
        //       {
        //         field: "status",
        //         value: filteredValue,
        //         method: "eq",
        //       },
        //       {
        //         field: "totalPrice",
        //         value: 5000,
        //         method: "lt",
        //       },
        //     ],
        //   };
        {
          field: "status",
          value: filteredValue,
          method: "eq",
        };

  // SORTING
  const sortBy = searchParams?.get("sortBy")
    ? searchParams.get("sortBy").split("-")
    : ["startDate", "desc"];

  // PAGINATION
  const page = searchParams?.get("page") ? +searchParams.get("page") : 1;

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page }),
  });

  // PRE-FETCH QUERY
  if (page < Math.ceil(count / PAGE_SIZE)) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page - 1 }),
    });
  }

  //

  return {
    isLoading,
    bookings,
    error,
    count,
  };
};
