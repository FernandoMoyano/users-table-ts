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
export const updateUser = async (updatedUser: IUser): Promise<IUser> => {
  try {
    const response = await fetch(`${baseUrl}/${updatedUser.id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar usuario:${response.statusText}`);
    }
    const data: IUser = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//POST User_____________________________
export const addUser = async (newUser: IUser): Promise<IUser> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`No se puede agregar el usuario ${response.statusText}`);
    }

    const newUserAdded = await response.json();

    return newUserAdded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
