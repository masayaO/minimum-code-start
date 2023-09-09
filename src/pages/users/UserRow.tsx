import { roleLabels, User } from "./types.ts";

type UserRowProps = {
  user: User;
  onClickEditButton: (id: number) => void;
  onDeleted: (id: number) => Promise<void>;
};

export const UserRow = ({
  user,
  onClickEditButton,
  onDeleted,
}: UserRowProps) => {
  const handleDeleteButtonClick = async () => {
    if (confirm("本当に削除しますか？")) {
      await onDeleted(user.id);
    }
  };
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{roleLabels[user.role]}</td>
      <td>{user.createdAt}</td>
      <td>{user.updatedAt}</td>
      <td>
        <button onClick={() => onClickEditButton(user.id)}>編集</button>
        <button onClick={() => handleDeleteButtonClick()}>削除</button>
      </td>
    </tr>
  );
};
