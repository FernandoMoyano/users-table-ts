import { Form } from "antd";
import { useState } from "react";
import { IUser } from "../interfaces/IUser";

export const UseForms = (initialValues: IUser | null) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (changedValues: IUser) => {
    setFormValues({ ...formValues, ...changedValues });
  };

  const handleReset = () => {
    form.resetFields();
    setFormValues(initialValues);
  };

  const validateField = async () => {
    try {
      const values = await form.validateFields();
      return values;
    } catch (error) {
      console.error("validation failed", error);
    }
  };

  return {
    form,
    formValues,
    handleChange,
    handleReset,
    validateField,
  };
};
