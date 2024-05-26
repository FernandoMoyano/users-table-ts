import { IUser } from "../interfaces/IUser";

const baseUrl = "htpp://localhost:4000/users";
const headers = {
  "Content-Type": "application/json",
};

//GET-users_______________________________
export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "GET",
      headers: headers,
    });

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

//DELTE-users________________________________
export const deleteUser = async (id: number | string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar usuario:${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//UPDATE-users___________________________________
export const updateUser = async (updatedUser: IUser): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/${updatedUser.id}`, {
      method: "PUT",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar usuario:${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
