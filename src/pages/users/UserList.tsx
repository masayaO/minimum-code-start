import { useUser } from "./useUser.ts";
import { User } from "./types.ts";
import { useState } from "react";
import { HeaderRow } from "./HeaderRow.tsx";
import { Loading } from "./Loading.tsx";
import { UserRow } from "./UserRow.tsx";
import { EditingUserRow } from "./EditingUserRow.tsx";

export const UserList = () => {
  const { users, editUser, deleteUser, refetch } = useUser();
  const [editingUserId, setEditingUserId] = useState<number | undefined>(
    undefined,
  );
  const handleEditButtonClick = (id: number) => {
    setEditingUserId(id);
  };

  const onSaved = async (user: User) => {
    await editUser(user);
    await refetch();
    setEditingUserId(undefined);
  };

  const onDeleted = async (id: number) => {
    await deleteUser(id);
    await refetch();
  };

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <table>
        <thead>
          <HeaderRow />
        </thead>
        <tbody>
          {users === undefined ? (
            <Loading />
          ) : (
            users.map((user) => {
              return editingUserId === user.id ? (
                <EditingUserRow
                  user={user}
                  isCanceled={() => setEditingUserId(undefined)}
                  onSaved={onSaved}
                />
              ) : (
                <UserRow
                  user={user}
                  onClickEditButton={handleEditButtonClick}
                  onDeleted={onDeleted}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
