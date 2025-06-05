import { Modal, Button, Input, Form } from "antd";
import { handleBeforeInput } from "../../utils/validationFunctions";
import { changevalidations, nameValidation } from "../../utils/formValidations";

const DeleteModelAnt = ({
  visible,
  onCancel,
  onDelete,
  title = "Confirm Deletion",
  deleteMessage = "Are you sure to delete ",
  loading = false,
  name = "",
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onDelete(values.remark); // Pass the remark to the onDelete handler
      form.resetFields();
    });
  };

  const handleCancle = () => {
    // onCancel(remark);
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null} // Custom footer
      destroyOnHidden
      width={400}
    >
      <p>
        {deleteMessage} <span className="text-danger fw-bold">{name}</span> ?
      </p>
      <Form layout="vertical" onFinish={() => handleSubmit()}>
        <Form.Item
          // label="Remark"
          name="remark"
          rules={nameValidation("Remark", 3, 20)}
        >
          <Input.TextArea
            onBeforeInput={handleBeforeInput(
              changevalidations.numberletterspace,
              20
            )}
            placeholder="Enter remark"
            rows={2}
          />
        </Form.Item>
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Button onClick={handleCancle} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" danger htmlType="submit" loading={loading}>
            Delete
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DeleteModelAnt;
