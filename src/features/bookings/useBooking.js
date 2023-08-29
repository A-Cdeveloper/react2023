import { getBooking as getBookingApi } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingApi(bookingId),
    retry: false,
  });
  return {
    isLoading,
    booking,
    error,
  };
};
