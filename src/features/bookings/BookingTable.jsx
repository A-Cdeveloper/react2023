import { useBookings } from "./useBookings";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import Pagination from "../../ui/Pagination";
//import { sorting } from "../../utils/helpers";

function BookingTable() {
  //const bookings = [];
  const { isLoading, bookings, error, count } = useBookings();

  // console.log(bookings);
  //console.log(count);

  if (bookings && !bookings.length) return <Empty resource="bookings" />;
  if (isLoading) return <Spinner />;

  // // FILTER
  // const filteredValue = searchParams.get("status");
  // const filteredBooking = bookings.filter((booking) => {
  //   return filteredValue && filteredValue !== "all"
  //     ? booking.status === filteredValue
  //     : booking;
  // });

  // // SORTING

  // const sortedValue = searchParams?.get("sortBy")
  //   ? searchParams.get("sortBy").split("-")
  //   : ["startDate", "desc"];
  // console.log(sortedValue);
  // sorting(filteredBooking, sortedValue[0], sortedValue[1]);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default BookingTable;
