import { IUser } from "../interfaces/IUser";

const baseUrl = "htpp://localhost:4000/users";
const headers = {
  "Content-Type": "application/json",
};

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error("Error al intentar obtener los datos");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
