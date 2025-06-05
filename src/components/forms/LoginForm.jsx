import { Button, Form, Input } from "antd";
import { changevalidations, nameValidation } from "../../utils/formValidations";
import { handleBeforeInput } from "../../utils/validationFunctions";

const LoginForm = ({ loading, handleSubmit, toggleForm }) => {
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
  const resetForm = (second) => {
    form.resetFields();
  };

  // useEffect(() => {
  //   if (selectedData) {
  //     form.setFieldsValue({
  //       name: selectedData.name,
  //       id: selectedData.id,
  //       description: selectedData.description,
  //     });
  //   } else {
  //     form.resetFields();
  //   }

  //   return () => {
  //     form.resetFields();
  //   };
  // }, [selectedData]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="loginform"
      onFinish={handleOnFinish}
    >
      {/* <div className="text-center position-absolute" style={{top:"15px"}}>
        <h4 className="fw-bold" style={{ color: "#000" }}>
          <img src="assets/images/logo/logo-2.svg" alt="logo" height="30" />
          Web Builder
        </h4>
      </div> */}

      <h2>Sign In</h2>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please input a valid email!" },
        ]}
      >
        <Input
          onBeforeInput={handleBeforeInput(
            changevalidations.allwithoutspace,
            30
          )}
          placeholder="Enter Email Address"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          className="py-0 ps-1"
          onBeforeInput={handleBeforeInput(
            changevalidations.allwithoutspace,
            15
          )}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
        >
          Login
        </Button>
      </Form.Item>

      <p className="signup">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={() => {
            resetForm();
            toggleForm();
          }}
        >
          Sign Up.
        </a>
      </p>
    </Form>
  );
};

export default LoginForm;
