export const roles = ["admin", "editor", "viewer"] as const;
export type Role = (typeof roles)[number];

export type User = {
  id: number;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export const roleLabels: { [key in Role]: string } = {
  admin: "管理者",
  editor: "編集者",
  viewer: "閲覧者",
};
