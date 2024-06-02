import { IUser } from "../interfaces/IUser";

export const transformResponse = (users: IUser[]): IUser[] => {
  if (!users) {
    return [];
  }

  return users.map((user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    status: user.status,
    age: user.age,
  }));
};
