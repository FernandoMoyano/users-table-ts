import { useEffect, useState } from "react";
import "./App.css";
import { IUser } from "./interfaces/IUser";
import { Modal, Space, Table, Tag } from "antd";
import { TableProps } from "antd/es/table";
import { ActionType, ResponseType, Status } from "./enums";
import UseGetUsers from "./hooks/UseGetUsers";
import { deleteUser, updateUser } from "./api/userApi";
import { UseModal } from "./hooks/UseModal";

function App() {
  //Estados_____________________________
  const { users, isloading, error } = UseGetUsers();
  const [data, setData] = useState<IUser[]>(users);

  useEffect(() => {
    setData(users);
  }, [users]);

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

  const { modalState, openModal, handleModalResponse } = UseModal(
    handleConfirmEdit,
    handleConfirmDelete
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
      {modalState.isOpen && (
        <Modal
          open={modalState.isOpen}
          onOk={() => handleModalResponse(ResponseType.Confirm)}
          onCancel={() => handleModalResponse(ResponseType.Cancel)}
        />
      )}
    </>
  );
}

export default App;
