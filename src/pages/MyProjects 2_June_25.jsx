import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
  Flex,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PoweroffOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import NoDataFound from "../components/NoDataFound";
import RedButton from "../components/buttons/RedButton";

const { Meta } = Card;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("projects")) || [];
    console.log(data);

    if (data) {
      setProjects(data);
      // obj.assets = [obj.assets[1]];
      // obj.styles = obj.styles.slice(0, 1);
      // localStorage.setItem("test", JSON.stringify(obj));
      // console.log(obj);
    }
  }, []);

  const showModal = (project = null) => {
    console.log(project);

    setEditingProject(project);
    form.setFieldsValue(project || { name: "", description: "", image: "" });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingProject) {
          const updatedProjects = projects.map((project) =>
            project.id === editingProject.id
              ? { ...editingProject, ...values }
              : project
          );

          setProjects(updatedProjects);
          localStorage.setItem("projects", JSON.stringify(updatedProjects));

          // setProjects((prev) =>
          //   prev.map((project) =>
          //     project.id === editingProject.id ? { ...editingProject, ...values } : project
          //   )
          // );
          message.success("Project updated");
        } else {
          const newProject = {
            id: Date.now(),
            ...values,
          };
          console.log(newProject);
          navigate("/editor/" + newProject.id, {
            state: {
              newproject: newProject,
            },
          });

          setProjects((prev) => [...prev, newProject]);
          message.success("Project added");
        }
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteProject = (id) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    message.success("Project deleted");
  };
  const handleSearch = (values) => {
    // Pass search input to parent or do something with it
    console.log("Search:", values.search);
    if (onSearch) onSearch(values.search);
  };

  return (
    <>
      <Flex justify="space-between" align="top" gap="small">
        <Form form={form2} onFinish={handleSearch}>
          <Form.Item name="search" noStyle>
            <Input
              placeholder="Search projects"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              allowClear
              onPressEnter={() => form2.submit()}
            />
          </Form.Item>
        </Form>

        {/* <button
          className="main-btn red-main-btn"
          // icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ marginBottom: 10 }}
        <RedButton onClick={showModal} text="New Project" icon="/>
        
          <PlusOutlined /> New Project
        </button> */}
        <RedButton className="mb-2" text="New Project" icon={<PlusOutlined />} onClick={() => showModal()}/>
      </Flex>
      <hr className="mt-0" />

      {/* <Row gutter={[24, 24]}>
        {projects.map((project) => (
          <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
            <Card
              style={{
                background: "#F5F5DC",
              }}
              hoverable
              onClick={() =>
                navigate("/editor/" + project.id, {
                  state: {
                    newproject: project,
                  },
                })
              }
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent opening detail view
                    showModal(project);
                  }}
                />,
                <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                  onCancel={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()} // prevent opening detail view
                  cover={<img alt={project.name} src={project.image} />}
                >
                  <DeleteOutlined key="delete" style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <Meta title={project.name} description={project.description} />
            </Card>
          </Col>
        ))}
      </Row> */}

      <Row gutter={[16, 16]}>
        {projects.length === 0 ? (
          <Col span={24}>
            <NoDataFound />
          </Col>
        ) : (
          projects.map((project) => (
            <Col xs={24} sm={12} md={6} lg={4} key={project.id}>
              <div
                className="card card-hover fancy-card p-1"
                style={{
                  // fontSize: "0.85rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate("/editor/" + project.id, {
                    state: { newproject: project },
                  })
                }
              >
                <img
                  src="https://www.digitalsilk.com/wp-content/uploads/2020/06/website-development-process-hero-image.png"
                  alt="Scholarship"
                  className="card-img-top"
                  style={{
                    aspectRatio: "3 / 2",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />

                <div className="card-body py-1 px-2">
                  <h6 className="card-title fw-semibold mb-1">
                    {project.name}
                  </h6>
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "0.75rem" }}
                  >
                    1 day ago
                  </p>
                </div>

                <div className="bg-light d-flex justify-content-end gap-1 px-2 py-1 border-0">
                  <Popconfirm
                    title="Are you sure to delete this project?"
                    onConfirm={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                    onCancel={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      icon={
                        <MdDelete
                          style={{ color: "#424242", fontSize: "16px" }}
                        />
                      }
                    />
                  </Popconfirm>

                  <Button
                    size="small"
                    variant="outlined"
                    icon={
                      <FaEdit style={{ color: "#424242", fontSize: "16px" }} />
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(project);
                    }}
                  />
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>

      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="projectForm">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please enter a project name" },
              {
                min: 3,
                message: "Project name must be at least 3 characters long",
              },
              { max: 50, message: "Project name cannot exceed 50 characters" },
              {
                pattern: /^[a-zA-Z0-9\s]+$/,
                message:
                  "Project name can only contain letters, numbers, and spaces",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          {/* <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please provide an image URL" }]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ProjectList;
