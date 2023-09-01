import Table from "../../ui/Table";
// import CabinRow from "./CabinRow";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

import useAllUsers from "./useAllUsers";
import UserRow from "./UserRow";

/////////////////////////////////////
const UsersTable = () => {
  const { isLoading, users, error } = useAllUsers();

  //   const [searchParams] = useSearchParams();

  if (users && !users.length) return <Empty resource="users" />;
  if (isLoading) return <Spinner />;

  // FILTER
  //   const filteredValue = searchParams.get("discount");
  //   const filteredCabin = cabins.filter((cab) => {
  //     return filteredValue === "with-discount"
  //       ? cab.discount === 0
  //       : filteredValue === "no-discount"
  //       ? cab.discount !== 0
  //       : cab;
  //   });

  //SORT
  //   const sortedValue = searchParams?.get("sortBy")
  //     ? searchParams.get("sortBy").split("-")
  //     : ["name", "asc"];
  //   sorting(filteredCabin, sortedValue[0], sortedValue[1]);

  return (
    <Table columns=".5fr 1.8fr 2.2fr 1.6fr 1.8fr 1.4fr 1.4fr">
      <Table.Header>
        <div></div>
        <div>Fullname</div>
        <div>E-Mail</div>
        <div>Role</div>
        <div>Created</div>
        <div>Last Sign In</div>
      </Table.Header>
      <Table.Body
        data={users}
        render={(user) => {
          return <UserRow key={user.id} user={user} />;
        }}
      />
    </Table>
  );
};

export default UsersTable;
