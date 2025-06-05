import { Button, Flex, Form, Input } from "antd";
import {
  changevalidations,
  lettersWithSpacesValidation,
  nameValidation,
} from "../../utils/formValidations";
import { handleBeforeInput } from "../../utils/validationFunctions";
import React from "react";
import video from "../../assets/gif/emailVerification.mp4";
const RegisterForm = ({ loading, handleSubmit, toggleForm }) => {
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
  const resetForm = () => {
    form.resetFields();
  };
  // Stepper and OTP state
  const [currentStep, setCurrentStep] = React.useState(0);
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpLoading, setOtpLoading] = React.useState(false);

  // Dummy OTP handler (replace with real API)
  const handleSendOtp = () => {
    setOtpLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtpLoading(false);
      form.setFieldValue("otp", "");
      alert("otp send")
    }, 1000);
  };

  const handleVerifyOtp = (values) => {
    // Replace with real OTP verification logic
    if (values.otp === "123456") {
      handleSubmit(form.getFieldsValue());
    } else {
      form.setFields([
        {
          name: "otp",
          errors: ["Invalid OTP!"],
        },
      ]);
    }
  };

  // Steps content
  const steps = [
    {
      title: "Register",
      content: (
        <>
          <h2>Create an account</h2>
          <Form.Item
            label="Name"
            name="name"
            rules={lettersWithSpacesValidation("Name", 4, 30)}
          >
            <Input
              onBeforeInput={handleBeforeInput(
                changevalidations.letterwithspace,
                30
              )}
              placeholder="Enter Name"
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue = value
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                form.setFieldsValue({ name: formattedValue });
              }}
            />
          </Form.Item>

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
            label="Create Password"
            name="password"
            rules={[{ required: true, message: "Please create a password!" }]}
          >
            <Input.Password
              onBeforeInput={handleBeforeInput(
                changevalidations.allwithoutspace,
                15
              )}
              className="input-password-field"
              placeholder="Create Password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Password do not match!");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </>
      ),
    },
    {
      title: "OTP Verification",
      content: (
        <>
          <Flex justify="center">
            {otpSent ? (
              <video
                src={video}
                alt="No Data Found"
                style={{ width: "100px", height: "100px" }}
                autoPlay
                loop
                className="mb-2"
              />
            ) : (
              <img
                src={require("../../assets/images/password-protection.png")}
                alt="No Data Found"
                style={{ width: "100px", height: "100px" }}
                autoPlay
                loop
                className="mb-2"
              />
            )}
          </Flex>

          <h2>{otpSent ? "Verify Email" : "Send OTP"}</h2>
          <p>
            {otpSent
              ? "Enter the OTP sent to your email."
              : "Click below to send OTP to your email."}
          </p>
          {!otpSent ? (
            <Button
              type="primary"
              block
              loading={otpLoading}
              onClick={handleSendOtp}
              className="mb-3"
            >
              Send OTP
            </Button>
          ) : (
            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                { required: true, message: "Please enter the OTP!" },
                { len: 6, message: "OTP must be 6 digits!" },
              ]}
            >
              <Input
                maxLength={6}
                // placeholder="00000"
                // style={{fontSize:'20px',letterSpacing:'32px', paddingLeft:10}}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </Form.Item>
          )}
        </>
      ),
    },
  ];

  // Handle step change
  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields([
          "name",
          "email",
          "password",
          "confirmPassword",
        ]);
        setCurrentStep(1);
      } else if (currentStep === 1 && otpSent) {
        const values = await form.validateFields(["otp"]);
        handleVerifyOtp(values);
      }
    } catch (err) {
      // Validation errors handled by antd
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <Form form={form} name="signup" layout="vertical" onFinish={handleOnFinish}>
      {/* <div style={{ marginBottom: 24 }}>
        <div className="stepper" style={{ display: "flex", gap: 8 }}>
          {steps.map((step, idx) => (
            <div
              key={step.title}
              style={{
                flex: 1,
                padding: 8,
                borderBottom:
                  idx === currentStep ? "2px solid #1890ff" : "2px solid #eee",
                color: idx === currentStep ? "#1890ff" : "#888",
                textAlign: "center",
                fontWeight: idx === currentStep ? "bold" : "normal",
              }}
            >
              {step.title}
            </div>
          ))}
          </div>
          </div> */}
      {steps[currentStep].content}
      {currentStep === 1 && otpSent && (
        <div style={{ marginBottom: 16, textAlign: "right" }}>
          <Button
            type="link"
            disabled={otpLoading}
            onClick={handleSendOtp}
            style={{ padding: 0 }}
          >
            Resend OTP
          </Button>
        </div>
      )}
      <Form.Item>
        {currentStep === 0 && (
          <Button
            type="primary"
            block
            onClick={handleNext}
            loading={loading}
            htmlType="button"
          >
            Next
          </Button>
        )}
        {currentStep === 1 && (
          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={handlePrev} style={{ flex: 1 }}>
              Back
            </Button>
            <Button
              type="primary"
              block
              style={{ flex: 2 }}
              onClick={handleNext}
              loading={loading}
              htmlType="button"
              disabled={!otpSent}
            >
              Verify & Sign Up
            </Button>
          </div>
        )}
      </Form.Item>
      {currentStep === 0 && (
        <p className="signup">
          Already have an account?{" "}
          <a
            href="#"
            onClick={() => {
              resetForm();
              toggleForm();
            }}
          >
            Sign in.
          </a>
        </p>
      )}
    </Form>
  );
};

export default RegisterForm;
