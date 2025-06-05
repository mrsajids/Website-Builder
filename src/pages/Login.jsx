import React, { useContext, useEffect, useMemo, useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import "../assets/css/login.css";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import BlurImage from "../components/SmoothBlurImage";
import { GoArrowLeft } from "react-icons/go";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const Login = () => {
  // const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

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
        description: `Welcome, ${values.email}`,
      });
      login(values.email, "Sajeed");
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
      description: `Account created for ${values.email}`,
    });
  };

  useEffect(() => {
    if (location?.state) {
      console.log(location?.state);
      toggleForm();
    }
  }, [location]);

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
            <button
              className="btn btn-sm back-btn"
              onClick={() => navigate("/")}
            >
              <GoArrowLeft />
            </button>
            <LoginForm
              loading={loading}
              toggleForm={toggleForm}
              handleSubmit={handleLogin}
            />
          </div>
        </div>

        {/* Sign Up Box */}

        <div className="user signupBx">
          <div className="formBx">
            <RegisterForm
              loading={loading}
              toggleForm={toggleForm}
              handleSubmit={handleSignUp}
            />
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
