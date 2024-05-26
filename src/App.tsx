import { useState } from "react";
import "./App.css";
import { IUser } from "./interfaces/IUser";
import { Modal, Space, Table, Tag } from "antd";
import { TableProps } from "antd/es/table";
import { ActionType, Status } from "./enums";
import UseGetUsers from "./hooks/UseGetUsers";

function App() {
  //estados para el modal______________
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [modalAction, setModalAction] = useState<ActionType | null>(null);

  const { users, isloading, error } = UseGetUsers();

  const openModal = (action: ActionType, user: IUser) => {
    setIsModalOpen(true);
    setModalAction(action);
    setCurrentUser(user);
  };

  const handleModalResponse = () => {};

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
          dataSource={users}
          columns={columns}
          rowKey='id'
          size='middle'></Table>
      )}
      {currentUser && modalAction && (
        <Modal
          open={isModalOpen}
          onOk={() => handleModalResponse()}
          onCancel={() => handleModalResponse()}
        />
      )}
    </>
  );
}

export default App;
