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
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const ProjectList = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Portfolio Website",
      description: "A personal site built with React.",
      image:
        "https://img.freepik.com/free-vector/cartoon-web-design-landing-page_52683-70880.jpg?semt=ais_hybrid&w=740",
    },
    {
      id: 2,
      name: "E-commerce App",
      description: "An online store built with Next.js and Stripe.",
      image:
        "https://img.freepik.com/free-vector/cartoon-web-design-landing-page_52683-70880.jpg?semt=ais_hybrid&w=740",
    },
  ]);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   let obj = JSON.parse(localStorage.getItem("test"));
  //   console.log(obj);

  //   if (obj) {
  //     // obj.assets = [obj.assets[1]];
  //     // obj.styles = obj.styles.slice(0, 1);
  //     // localStorage.setItem("test", JSON.stringify(obj));
  //     // console.log(obj);
  //   }
  // }, []);

  const showModal = (project = null) => {
    setEditingProject(project);
    form.setFieldsValue(project || { name: "", description: "", image: "" });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingProject) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id ? { ...editingProject, ...values } : p
          )
        );
        message.success("Project updated");
      } else {
        const newProject = {
          id: Date.now(),
          ...values,
        };
        setProjects((prev) => [...prev, newProject]);
        message.success("Project added");
      }
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    message.success("Project deleted");
  };

  return (
    <>
      <Flex justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ marginBottom: 10 }}
        >
          New Project
        </Button>
      </Flex>

      <Row gutter={[24, 24]}>
        {projects.map((project) => (
          <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
            <Card
              hoverable
              cover={<img alt={project.name} src={project.image} />}
              actions={[
                <EditOutlined key="edit" onClick={() => showModal(project)} />,
                <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={() => deleteProject(project.id)}
                >
                  <DeleteOutlined key="delete" style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <Meta title={project.name} description={project.description} />
            </Card>
          </Col>
        ))}
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
            rules={[{ required: true, message: "Please enter a project name" }]}
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
