import { useState } from "react";
import "./App.css";
import { IUser } from "./interfaces/IUser";
import { Modal, Space, Table, Tag } from "antd";
import { TableProps } from "antd/es/table";
import { ActionType, ResponseType, Status } from "./enums";
import UseGetUsers from "./hooks/UseGetUsers";
import { deleteUser, updateUser } from "./api/userApi";

function App() {
  //estados para el modal______________
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [modalAction, setModalAction] = useState<ActionType | null>(null);

  const { users, isloading, error } = UseGetUsers();

  const [data, setData] = useState<IUser[]>(users);

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

  //Respuesta del Usuario frente al modal_________________
  const handleModalResponse = async (response: ResponseType) => {
    if (currentUser && modalAction) {
      if (response === ResponseType.Confirm) {
        switch (modalAction) {
          case ActionType.Edit:
            await handleConfirmEdit(currentUser);
            break;

          case ActionType.Delete:
            await handleConfirmDelete(currentUser.id);
            break;
        }
      }
      setIsModalOpen(false);
      setCurrentUser(null);
      setModalAction(null);
    }
  };

  //Manejo de la apertura o cierre del modal___________________
  const openModal = (action: ActionType, user: IUser) => {
    setIsModalOpen(true);
    setModalAction(action);
    setCurrentUser(user);
  };

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
          <a onClick={() => openModal(ActionType.Edit, record)}>Edit</a>
          <a onClick={() => openModal(ActionType.Delete, record)}>Delete</a>
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
      {currentUser && modalAction && (
        <Modal
          open={isModalOpen}
          onOk={() => handleModalResponse(ResponseType.Confirm)}
          onCancel={() => handleModalResponse(ResponseType.Cancel)}
        />
      )}
    </>
  );
}

export default App;
