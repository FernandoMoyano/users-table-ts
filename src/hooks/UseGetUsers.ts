import { useEffect, useState } from "react";
import { transformResponse } from "../utils/transformResponse";
import { IUser } from "../interfaces/IUser";

const UseGetUsers = () => {
  //estados para la carga inicial de datos___________

  const [users, setUsers] = useState<IUser[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<IUser[]> => {
      try {
        const response = await fetch("http://localhost:4000/users");
        setIsLoading(true);

        if (!response.ok) {
          throw new Error(`Error al obtener los datos${response.statusText} `);
        }
        const users: IUser[] = await response.json();
        const usersTransformed = transformResponse(users);
        setUsers(usersTransformed);
        return users;
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
