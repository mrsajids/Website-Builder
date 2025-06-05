import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { changevalidations, nameValidation } from "../../utils/formValidations";
import { handleBeforeInput } from "../../utils/validationFunctions";
import BlueButton from "../buttons/BlueButton";

const NewProjectForm = ({ selectedData, handleSubmit, action }) => {
  const [form] = Form.useForm();

  const handleOnFinish = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values);
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  useEffect(() => {
    if (selectedData) {
      form.setFieldsValue({
        name: selectedData.name,
        id: selectedData.id,
        description: selectedData.description,
      });
    } else {
      form.resetFields();
    }

    return () => {
      form.resetFields();
    };
  }, [selectedData]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="projectForm"
      onFinish={handleOnFinish}
    >
      <Form.Item
        name="name"
        label="Project Name"
        rules={nameValidation("Project Name", 3, 20)}
      >
        <Input
          onBeforeInput={handleBeforeInput(
            changevalidations.numberletterspace,
            20
          )}
          placeholder="Enter project name"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={nameValidation("Description", 3, 50)}
      >
        <Input.TextArea
          onBeforeInput={handleBeforeInput(
            changevalidations.numberletterspace,
            50
          )}
          placeholder="Enter Description"
          rows={2}
        />
      </Form.Item>
      <Form.Item className="d-flex justify-content-end m-0">
        <BlueButton
          className={"main-btn-sm-p"}
          text={action === "update" ? "Update" : "Submit"}
          type="submit"
        />
        {/* <Button
          variant="solid"
          className="darkblue-main-btn-ant"
          // style={{}}
          htmlType="submit"
        >
          {action === "update" ? "Update" : "Submit"}
        </Button> */}
        <Button
          type="default"
          variant="outlined"
          htmlType="button"
          style={{ marginLeft: "10px" }}
          onClick={() => form.resetFields()}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewProjectForm;
