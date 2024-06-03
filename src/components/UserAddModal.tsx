import React from "react";
import { IUser } from "../interfaces/IUser";
import { Status } from "../enums";

interface IUserAddModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (user: IUser) => void;
}

const UserAddModal: React.FC<IUserAddModalProps> = () => {
  const initialFormValues = {
    username: "",
    email: "",
    name: "",
    lastname: "",
    status: Status.Active,
    age: "",
  };

  return <div>UserAddModal</div>;
};

export default UserAddModal;
