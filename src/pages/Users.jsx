import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import UsersTable from "../features/authentication/UsersTable";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
      <UsersTable />
    </>
  );
}

export default NewUsers;
