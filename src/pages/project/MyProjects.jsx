import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  message,
  Flex,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import NoDataFound from "../../components/NoDataFound";
import RedButton from "../../components/buttons/RedButton";
import NewProjectForm from "../../components/forms/NewProjectForm";
import DeleteModelAnt from "../../components/modals/DeleteModelAnt";
import BlueButton from "../../components/buttons/BlueButton";
import BlueOutlineButton from "../../components/buttons/BlueOutlineButton";
import "./project.css";
import ThreeDotMenu from "../../components/ThreeDotMenu";
const { Meta } = Card;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  // const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    // form.setFieldsValue(project || { name: "", description: "", image: "" });
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    if (editingProject) {
      const updatedProjects = projects.map((project) =>
        project.id === editingProject.id
          ? { ...editingProject, ...values }
          : project
      );

      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEditingProject(null);
  };

  const deleteProject = (remarks) => {
    console.log(remarks);

    if (editingProject) {
      const updatedProjects = projects.filter(
        (p) => p.id !== editingProject.id
      );
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      message.success("Project deleted");
      handleCancelDelete();
    }
    setIsDeleteModalOpen;
  };
  const handleSearch = (values) => {
    // Pass search input to parent or do something with it
    console.log("Search:", values.search);
    if (onSearch) onSearch(values.search);
  };
  // Function to handle the menu item click
  const handleItemClick = (key, item) => {
    console.log("Clicked item:", key, item);
    // rename project
    if (key === "1") {
      showModal(item);
      // delete project
    } else if (key === "2") {
      setIsDeleteModalOpen(true);
      setEditingProject(item);
    }
  };

  return (
    <div className="">
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
        <span>
          <BlueOutlineButton
            className="mb-2 me-1"
            text="Start with Template"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          />
          <BlueButton
            className="mb-2"
            text="New Project"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          />
        </span>
      </Flex>
      <hr className="mt-0" />

      {/* <Row gutter={[16, 16]}>
        {projects.length === 0 ? (
          <Col span={24}>
            <NoDataFound />
          </Col>
        ) : (
          projects.map((project) => (
            <Col xs={24} sm={12} md={6} lg={4} key={project.id}>
              <div
                className="card card-hover fancy-card p-1 fadeIn"
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
                  <Button
                    size="small"
                    variant="outlined"
                    icon={
                      <MdDelete
                        style={{ color: "#424242", fontSize: "16px" }}
                      />
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDeleteModalOpen(true);
                      setEditingProject(project);
                    }}
                  />

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
      </Row> */}
      <Row gutter={[16, 8]} style={{ margin: 5 }}>
        {projects.length === 0 ? (
          <Col span={24}>
            <NoDataFound />
          </Col>
        ) : (
          projects.map((template) => (
            <Col key={template.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                // onClick={() => navigate("/preview/" + template.id)}
                hoverable
                className="project-card"
                size="small"
                cover={
                  <img
                    alt={template.name}
                    src={
                      "https://static.vecteezy.com/system/resources/previews/016/547/646/non_2x/creative-website-template-designs-illustration-concepts-of-web-page-design-for-website-and-mobile-website-vector.jpg"
                    }
                    className="project-card-cover"
                  />
                }
              >
                <h4 className="project-card-title">{template.name}</h4>
                <p className="project-card-category fs-10">1 day ago</p>
                {/* <a
                  href={`/preview/${template.id}`}
                  className="project-card-link"
                >
                  Preview Template →
                </a> */}
                <Flex justify="space-between" align="end">
                  <a
                    // href={`/preview/${template.id}`}
                    className="project-card-link"
                    onClick={() =>
                      navigate("/editor/" + template.id, {
                        state: { newproject: template },
                      })
                    }
                  >
                    View →
                  </a>
                  <ThreeDotMenu
                    menuItems={[
                      { label: "Rename", icon: <FaEdit /> },
                      { label: "Delete", icon: <MdDelete /> },
                    ]} // Define the menu items
                    onMenuItemClick={(e) => handleItemClick(e, template)} // Define the function that handles the click
                    placement="bottomRight" // Optional, you can change the placement if needed
                  />
                </Flex>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {isModalOpen && (
          <NewProjectForm
            selectedData={editingProject}
            action={editingProject ? "update" : "entry"}
            handleSubmit={handleOk}
          />
        )}
      </Modal>
      {isDeleteModalOpen && (
        <DeleteModelAnt
          visible={isDeleteModalOpen}
          onDelete={deleteProject}
          onCancel={handleCancelDelete}
          name={editingProject ? editingProject.name : ""}
        />
      )}
    </div>
  );
};

export default ProjectList;
