import { useEffect, useState } from "react";
import type { User } from "./types";

let userState: User[] = [
  {
    id: 1,
    name: "Joe",
    role: "admin",
    createdAt: "2021-01-01 00:00:00",
    updatedAt: "2021-01-01 00:00:00",
  },
  {
    id: 2,
    name: "Alice",
    role: "editor",
    createdAt: "2021-01-01 00:00:00",
    updatedAt: "2021-01-01 00:00:00",
  },
  {
    id: 3,
    name: "Bob",
    role: "viewer",
    createdAt: "2021-01-01 00:00:00",
    updatedAt: "2021-01-01 00:00:00",
  },
];

export const useUser = () => {
  const [users, setUsers] = useState<User[]>();

  const fetchUsers = async () => {
    return new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve(userState);
      }, 1000);
    });
  };

  const editUser = async (user: User) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      });
    }).then(() => {
      userState = userState.map((u) => (u.id === user.id ? user : u));
    });
  };

  const deleteUser = async (id: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      });
    }).then(() => {
      userState = userState.filter((u) => u.id !== id);
    });
  };

  useEffect(() => {
    let ignore = false;
    fetchUsers().then((users) => {
      if (!ignore) {
        setUsers(users);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return {
    users,
    editUser,
    deleteUser,
    refetch: async () => {
      setUsers(undefined);
      const users = await fetchUsers();
      setUsers(users);
    },
  };
};
