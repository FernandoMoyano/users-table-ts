import { useEffect, useState } from "react";
import { transformResponse } from "../utils/transformResponse";
import { IUser } from "../interfaces/IUser";
import { getUsers } from "../api/userApi";

const UseGetUsers = () => {
  //estados para la carga inicial de datos___________

  const [users, setUsers] = useState<IUser[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const users = await getUsers();
        const usersTransformed = transformResponse(users);
        setUsers(usersTransformed);
        setError(null);
      } catch (error) {
        console.error(`Error `, error);
        setError(error instanceof Error ? error.message : "Uknown error");
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return {
    users,
    isloading,
    error,
  };
};

export default UseGetUsers;
