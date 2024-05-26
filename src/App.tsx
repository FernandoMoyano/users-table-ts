import { useEffect, useState } from "react";
import "./App.css";
import { ActionType, IUser, Status } from "./interfaces/IUser";
import { transformResponse } from "./utils/transformResponse";
import { Modal, Space, Table, Tag } from "antd";
import { TableProps } from "antd/es/table";
import { ActionModal } from "./enums/index";

function App() {
  //estados para la carga inicial de datos___________

  const [users, setUsers] = useState<IUser[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async (): Promise<IUser[]> => {
      try {
        const response = await fetch("http://localhost:4000/users");
        setIsLoading(true);

        if (!response.ok) {
          setIsError(true);
          throw new Error(`Error al obtener los datos `);
        }
        const users: IUser[] = await response.json();
        const usersTransformed = transformResponse(users);
        setUsers(usersTransformed);
        setIsLoading(false);
        setIsError(false);
        return users;
      } catch (error) {
        console.error(`Error `, error);
        throw error;
      }
    };
    fetchUsers();
  }, []);

  //estados para el modal______________
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [modalAction, setModalAction] = useState<ActionModal>(null);

  const openModal = (user: IUser, action: ActionModal) => {
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
          <a onClick={() => handleModal(ActionType.Delete, record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {!isloading && !isError && (
        <Table
          dataSource={users}
          columns={columns}
          rowKey='id'
          size='middle'></Table>
      )}
      {currentUser && modalAction && (
        <Modal
          open={isModalOpen}
          onOk={() => handleModal}
          onCancel={() => handleModal}
        />
      )}
    </>
  );
}

export default App;
