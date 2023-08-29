import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CabinRow from "./CabinRow";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

import { sorting } from "../../utils/helpers";

// const sorting = (array, field, order = "asc") => {
//   if (order !== "asc")
//     return array.sort((a, b) => (a[field] < b[field] ? 1 : -1));
//   return array.sort((a, b) => (a[field] < b[field] ? -1 : 1));
// };

/////////////////////////////////////
const CabinTable = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins, error } = useCabins();

  if (cabins && !cabins.length) return <Empty resource="cabins" />;
  if (isLoading) return <Spinner />;

  // FILTER
  const filteredValue = searchParams.get("discount");
  const filteredCabin = cabins.filter((cab) => {
    return filteredValue === "with-discount"
      ? cab.discount === 0
      : filteredValue === "no-discount"
      ? cab.discount !== 0
      : cab;
  });

  //SORT
  const sortedValue = searchParams?.get("sortBy")
    ? searchParams.get("sortBy").split("-")
    : ["name", "asc"];
  sorting(filteredCabin, sortedValue[0], sortedValue[1]);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabin}
          render={(cabin) => {
            return <CabinRow key={cabin.id} cabin={cabin} />;
          }}
        />

        <Table.Footer></Table.Footer>
      </Table>
    </Menus>
  );
};

export default CabinTable;
