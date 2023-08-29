import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckInOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: IsCheckingIn, mutate: checkinout } = useMutation({
    mutationFn: ({ bookingId, extras }) =>
      updateBookingApi(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...extras,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(
        `Booking #${data.id} succesfully ${data.status.replace("-", " ")}!`
      );
      data.status === "checked-in" ? navigate("/") : null;
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    IsCheckingIn,
    checkinout,
  };
};
