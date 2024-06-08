import React from "react";
import { IUser } from "../interfaces/IUser";
import { Form, Input, Modal, Select } from "antd";
import { UseForms } from "../hooks/UseForms";
import { Option } from "antd/es/mentions";
import { Status } from "../enums";

interface UserEditModalProps {
  open: boolean;
  user: IUser;
  onOk: (user: IUser) => void;
  onCancel: () => void;
}
const UserEditModal: React.FC<UserEditModalProps> = ({
  open,
  onOk,
  user,
  onCancel,
}) => {
  const { form, handleChange, handleReset, validateField } = UseForms(user);

  const handleOk = async () => {
    try {
      const values = await validateField();
      onOk({ ...user, ...values });
      handleReset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      title='Edit User'
      onCancel={onCancel}
      onOk={handleOk}
      okText='Edit'
      centered>
      <Form
        form={form}
        layout='horizontal'
        initialValues={user}
        onValuesChange={handleChange}>
        <Form.Item
          name='username'
          label='Username'
          rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: "Please input your name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='lastname'
          label='Lastname'
          rules={[{ required: true, message: "Please input your lastname!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='status'
          label='Status'
          rules={[{ required: true, message: "Please select your status!" }]}>
          <Select>
            <Option value={Status.Active}>Active</Option>
            <Option value={Status.Inactive}>Inactive</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='age'
          label='Age'
          rules={[
            { required: true, message: "Please input your age!" },
            {
              pattern: /^(?:1[01][0-9]|120|1[0-9]|[1-9][0-9]?)$/,
              message: "Age must be a number between 1 and 120!",
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
