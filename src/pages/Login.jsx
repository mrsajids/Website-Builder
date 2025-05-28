import React, { useContext, useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import "../assets/css/login.css";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import BlurImage from "../components/SmoothBlurImage";
import { GoArrowLeft } from "react-icons/go";

const Login = () => {
  // const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Toggle between Sign In and Sign Up
  const toggleForm = () => {
    // setIsSignUp(!isSignUp);
    const container = document.querySelector(".container");
    container.classList.toggle("active");
    // setTimeout(() => {
    // }, 200);
  };

  // Handle login form submission
  const handleLogin = (values) => {
    setLoading(true);
    console.log("Login form values: ", values);
    // You can integrate actual login logic here (API call)
    setTimeout(() => {
      notification.success({
        message: "Login Successful",
        description: `Welcome, ${values.username}`,
      });
      login(values.username, "Sajeed");
      setTimeout(() => {
        navigate("/projects");
      }, 1000);
    }, 2000);
  };

  // Handle sign-up form submission
  const handleSignUp = (values) => {
    console.log("Sign-up form values: ", values);
    // You can integrate actual sign-up logic here (API call)
    notification.success({
      message: "Sign Up Successful",
      description: `Account created for ${values.username}`,
    });
  };

  return (
    <section id="reg_login">
      <div className="container">
        {/* Sign In Box */}

        <div className="user signinBx">
          <div className="imgBx">
            <BlurImage
              hash=":9Eo;|HX5U?^IUDjtmNE^*DONH-qS1D%%MM_9bX-RPa0M|xtxDn%8w-pXmIps..7awt8M_sAt7Ri-:j]M|WC%fa$%1ngjHIVRQt6Q,adNHRjX9NGs-%2SQkrX5wct6jrWBj]"
              src="https://res.cloudinary.com/diyp1k5z5/image/upload/v1744874379/login-img_cdeenv.jpg"
              alt="My Image"
              width="100%"
              height="100%"
            />
            {/* <img
              src="https://res.cloudinary.com/diyp1k5z5/image/upload/v1744874379/login-img_cdeenv.jpg"
              alt=""
            /> */}
          </div>
          <div className="formBx">
            <button className="btn btn-sm back-btn" onClick={()=>navigate("/")}>
              <GoArrowLeft />
            </button>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              layout="vertical"
            >
              <h2>Sign In</h2>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" size="small" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="small" placeholder="Password" />
              </Form.Item>
              {/* 
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

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
                <a href="#" onClick={toggleForm}>
                  Sign Up.
                </a>
              </p>
            </Form>
          </div>
        </div>

        {/* Sign Up Box */}

        <div className="user signupBx">
          <div className="formBx">
            <Form
              name="signup"
              initialValues={{ remember: true }}
              onFinish={handleSignUp}
              layout="vertical"
            >
              <h2>Create an account</h2>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please input a valid email!" },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                label="Create Password"
                name="password"
                rules={[
                  { required: true, message: "Please create a password!" },
                ]}
              >
                <Input.Password placeholder="Create Password" />
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
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  Sign Up
                </Button>
              </Form.Item>

              <p className="signup">
                Already have an account?{" "}
                <a href="#" onClick={toggleForm}>
                  Sign in.
                </a>
              </p>
            </Form>
          </div>
          <div className="imgBx">
            <img
              src="https://res.cloudinary.com/diyp1k5z5/image/upload/v1744874376/signup-img_daepqz.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
