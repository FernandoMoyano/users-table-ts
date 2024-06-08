import React from "react";
import { IUser } from "../interfaces/IUser";
import { Modal } from "antd";

interface UserDeleteModalProps {
  open: boolean;
  user: IUser;
  onOk: () => void;
  onCancel: () => void;
}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({
  open,
  user,
  onOk,
  onCancel,
}) => {
  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} okText='Delete' centered>
      Are you sure you want to delete the user{" "}
      <strong>
        {user.name} {user.lastname}
      </strong>
      ?
    </Modal>
  );
};

export default UserDeleteModal;
