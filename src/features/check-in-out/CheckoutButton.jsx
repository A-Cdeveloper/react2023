import Button from "../../ui/Button";
import { useCheckInOut } from "./useCheckInOut";

function CheckoutButton({ bookingId }) {
  const { IsCheckingInOut, checkinout } = useCheckInOut();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={IsCheckingInOut}
      onClick={() => {
        checkinout({
          bookingId,
          extras: {
            status: "checked-out",
          },
        });
      }}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
