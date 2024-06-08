import { useEffect, useState } from "react";
import UseGetUsers from "../hooks/UseGetUsers";
import { IUser } from "../interfaces/IUser";
import { addUser, deleteUser, updateUser } from "../api/userApi";
import { UseModal } from "../hooks/UseModal";
import { Space, Table, TableProps, Tag } from "antd";
import { ActionType, ResponseType, Status } from "../enums";
import { v4 as uuidv4 } from "uuid";
import UserAddModal from "./UserAddModal";
import UserEditModal from "./UserEditModal";

const UserTable = () => {
  //Estados_____________________________
  const { users, isloading, error } = UseGetUsers();
  const [data, setData] = useState<IUser[]>(users);

  useEffect(() => {
    setData(users);
  }, [users]);

  //Confirmacion de agregar usuario__________________
  const handleConfirmAdd = async (newUser: IUser) => {
    try {
      const userWithId = { ...newUser, id: uuidv4() };
      const addedUser = await addUser(userWithId);
      setData((prevUsers) => [...prevUsers, addedUser]);
    } catch (error) {
      console.error("Error al agregar usuario", error);
    }
  };

  //confirmación de Edición_____________
  const handleConfirmEdit = async (updatedUser: IUser): Promise<void> => {
    try {
      const user = await updateUser(updatedUser);

      setData((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    }
  };

  //Confirmación de eliminación__________________
  const handleConfirmDelete = async (id: string | number): Promise<void> => {
    try {
      await deleteUser(id);

      setData((prevUsers) => prevUsers.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  const { modalState, openModal, closeModal, handleModalResponse } = UseModal(
    handleConfirmEdit,
    handleConfirmDelete,
    handleConfirmAdd
  );

  //Columnas de la tabla_____________
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",

      render: (status: Status) => {
        const color = status === Status.Active ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",

      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => openModal(record, ActionType.Edit)}>Edit</a>
          <a onClick={() => openModal(record, ActionType.Delete)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {!isloading && !error && (
        <Table
          dataSource={data}
          columns={columns}
          rowKey='id'
          size='middle'></Table>
      )}
      {modalState.action === ActionType.Add && (
        <UserAddModal
          open={modalState.isOpen}
          onOk={(user) => handleModalResponse(ResponseType.Confirm, user)}
          onCancel={closeModal}
        />
      )}
      {modalState.action === ActionType.Edit && modalState.user && (
        <UserEditModal
          open={modalState.isOpen}
          user={modalState.user}
          onOk={(user) => handleModalResponse(ResponseType.Confirm, user)}
          onCancel={closeModal}
        />
      )}
    </>
  );
};

export default UserTable;
