import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Form,
  Input,
  Button,
  Upload,
  Switch,
  Typography,
  Divider,
  Spin,
  message, // For the loader
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./userprofile.css";
import { isEqual } from "lodash"; // npm install lodash

const initialValues = {
  fullName: "Devika Sharma",
  email: "devika.sharma@example.com",
  phone: "+91 98765 43210",
  location: "New Delhi, India",
  about:
    "Creative UX/UI designer with 5+ years of experience in building user-centered digital products. Passionate about creating intuitive and beautiful interfaces.",
};

const { Title, Text } = Typography;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState(initialValues);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [imageFile, setImageFile] = useState(null);

  // Simulate fake loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
  }, []);

  const handleSubmit = () => {
    console.log("Saved profile:", profile);
  };

  const handleChange = (changedValues) => {
    setProfile({ ...profile, ...changedValues });
  };

  // Image Validation
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    const isSmallEnough = file.size / 1024 / 1024 < 5; // Check if image is less than 5MB
    if (!isSmallEnough) {
      message.error("Image must be smaller than 5MB!");
    }
    return isImage && isSmallEnough;
  };

  return (
    <Card className="profile-card">
      <div className="profile-header">
        <Title level={4} className="profile-title">
          My Profile
        </Title>
        {/* <Button
          type="primary"
          className="save-top-btn"
          icon={<UploadOutlined />}
          onClick={handleSubmit}
          disabled={loading}
        >
          Save Changes
        </Button> */}
      </div>

      {loading ? (
        <div className="loader-container d-flex justify-content-center align-items-center my-5">
          <Spin tip="Loading..." className="loader" />
        </div> // Display loader
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onValuesChange={(changedValues, allValues) => {
            setProfile(allValues);
            setIsFormChanged(!isEqual(allValues, initialValues));
          }}
        >
          <Row gutter={[32, 32]} className="profile-body">
            <Col xs={24} md={6} className="profile-avatar-col">
              <div className="avatar-wrapper">
                <Avatar
                  size={120}
                  style={{ backgroundColor: "#4B0082", fontSize: 40 }}
                >
                  {profile.fullName?.charAt(0).toUpperCase()}
                </Avatar>
                <label htmlFor="upload-photo" className="avatar-camera-icon">
                  <UploadOutlined />
                </label>
                <input
                  id="upload-photo"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (beforeUpload(file)) {
                      setImageFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfile((prev) => ({
                          ...prev,
                          avatar: reader.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <Title level={5} className="user-name">
                {profile.fullName}
              </Title>
              <Text type="secondary">UX/UI Designer</Text>
            </Col>

            <Col xs={24} md={18}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Location" name="location">
                    <Input prefix={<EnvironmentOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="About Me" name="about">
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </Col>
              </Row>

              <div
                className={
                  "button-group d-flex" +
                  (isFormChanged
                    ? " justify-content-between"
                    : " justify-content-end")
                }
              >
                {isFormChanged && (
                  <Button type="link" danger>
                    Cancel
                  </Button>
                )}
                <Button
                  type="primary"
                  className="save-bottom-btn"
                  onClick={handleSubmit}
                  disabled={!isFormChanged || loading}
                >
                  Save Changes
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Card>
  );
};

export default UserProfile;
