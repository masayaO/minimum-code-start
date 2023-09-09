import { Role, roleLabels, roles, User } from "./types.ts";
import { useState } from "react";

type EditingUserRowProps = {
  user: User;
  isCanceled: () => void;
  onSaved: (user: User) => Promise<void>;
};

export const EditingUserRow = ({
  user,
  isCanceled,
  onSaved,
}: EditingUserRowProps) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const handleSaveButtonClick = async () => {
    await onSaved({
      ...user,
      name,
      role,
    });
  };

  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>
        <input
          type="text"
          defaultValue={user.name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <select
          defaultValue={user.role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          {roles.map((role) => {
            return (
              <option key={role} value={role}>
                {roleLabels[role]}
              </option>
            );
          })}
          <option value="admin">管理者</option>
          <option value="editor">編集者</option>
          <option value="viewer">閲覧者</option>
        </select>
      </td>
      <td>{user.createdAt}</td>
      <td>{user.updatedAt}</td>
      <td>
        <button onClick={() => handleSaveButtonClick()}>保存</button>
        <button onClick={() => isCanceled()}>キャンセル</button>
      </td>
    </tr>
  );
};
