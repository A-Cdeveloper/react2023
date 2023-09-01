import { format } from "date-fns";
import Table from "../../ui/Table";
import UserAvatar from "./UserAvatar";

const UserRow = ({ user }) => {
  const {
    id,
    user_metadata: { avatar, fullName },
    email,
    role,
    created_at,
    last_sign_in_at,
    email_confirmed_at,
  } = user;

  // console.log(id);
  return (
    <Table.Row>
      <div>
        <UserAvatar avatar={avatar} fullName={fullName} />
      </div>
      <div>{fullName ? fullName : "admin"}</div>
      <div>{email}</div>
      <div>{email_confirmed_at ? role : "waiting conformation"}</div>
      <div>{format(new Date(created_at), "dd.MM.yyyy HH:mm")}</div>
      <div>
        {last_sign_in_at ? (
          format(new Date(last_sign_in_at), "dd.MM.yyyy HH:mm")
        ) : (
          <span>&mdash;</span>
        )}
      </div>
    </Table.Row>
  );
};

export default UserRow;
