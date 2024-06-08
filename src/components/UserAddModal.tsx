import React from "react";
import { IUser } from "../interfaces/IUser";
import { Status } from "../enums";
import { UseForms } from "../hooks/UseForms";
import { Form, Input, Modal, Select } from "antd";
import { Option } from "antd/es/mentions";

interface IUserAddModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (user: IUser) => void;
}

const UserAddModal: React.FC<IUserAddModalProps> = ({
  open,
  onOk,
  onCancel,
}) => {
  const initialFormValues = {
    id: "",
    username: "",
    email: "",
    name: "",
    lastname: "",
    status: Status.Active,
    age: 0,
  };

  const { form, handleChange, handleReset, validateField } =
    UseForms(initialFormValues);

  const handleOk = async () => {
    try {
      const values = await validateField();
      onOk(values);
      handleReset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} title='Add user' onCancel={onCancel} onOk={handleOk}>
      <Form
        form={form}
        initialValues={initialFormValues}
        onValuesChange={handleChange}
        layout='vertical'>
        <Form.Item
          name='username'
          label='username'
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='email' label='email' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='name' label='name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='lastname'
          label='lastname'
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='status' label='status'>
          <Select>
            <Option value={Status.Active}>Active</Option>
            <Option value={Status.Active}>Active</Option>
          </Select>
        </Form.Item>
        <Form.Item name='age' label='age' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserAddModal;
