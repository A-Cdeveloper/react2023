import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";

import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  // 1. NUmber od bookings
  const numBookings = bookings.length;

  // 2. Number of sales
  const sales = bookings.reduce((acc, el) => {
    return acc + el.totalPrice;
  }, 0);

  // 3. total checkings
  const totalCheckins = confirmedStays.length;

  // 4. occupancy rate
  // num of checkins nights / all available nights
  const occupation =
    (confirmedStays.reduce((acc, cur) => {
      return acc + cur.numNights;
    }, 0) /
      (numDays * cabinCount)) *
    100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupation.toFixed(2)} %`}
      />
    </>
  );
};

export default Stats;
