// File: WebsiteTemplateScreen.jsx
import React, { useState } from "react";
import {
  Input,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Select,
  Flex,
  Pagination,
} from "antd";
import {
  FileImageOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./templates.css";
import TemplateCategouriesModal from "../../components/modals/TemplateCategouriesModal";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const categories = [
  { name: "Latest", icon: <FileImageOutlined /> },
  { name: "Popular", icon: <VideoCameraOutlined /> },
  { name: "All Categories", icon: <AppstoreOutlined /> },
];

const templates = [
  {
    id: 1,
    name: "Modern Website",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/016/547/646/non_2x/creative-website-template-designs-illustration-concepts-of-web-page-design-for-website-and-mobile-website-vector.jpg",
    category: "Website",
  },
  {
    id: 2,
    name: "Event Poster",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/016/547/646/non_2x/creative-website-template-designs-illustration-concepts-of-web-page-design-for-website-and-mobile-website-vector.jpg",
    category: "Poster",
  },
  {
    id: 3,
    name: "Portfolio",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/016/547/646/non_2x/creative-website-template-designs-illustration-concepts-of-web-page-design-for-website-and-mobile-website-vector.jpg",
    category: "Website",
  },
  {
    id: 4,
    name: "Vlog Layout",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/016/547/646/non_2x/creative-website-template-designs-illustration-concepts-of-web-page-design-for-website-and-mobile-website-vector.jpg",
    category: "Video",
  },
  {
    id: 5,
    name: "Resume Doc",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/016/547/646/non_2x/creative-website-template-designs-illustration-concepts-of-web-page-design-for-website-and-mobile-website-vector.jpg",
    category: "Doc",
  },
];

const WebsiteTemplateScreen = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const navigate = useNavigate()

  const filtered = templates
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : a.category.localeCompare(b.category)
    );

  // Modal state for category selection
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handler for category button click
  const handleCategoryClick = () => {
    setCategoryModalOpen(true);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of templates per page

  // Paginated data
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const handleCancelFilterModal = () => {
    setCategoryModalOpen(false);
  };  
  const handleFilterSubmit = (selected) => {
    // setCategoryModalOpen(false);
     setSelectedCategories(selected);
    setCategoryModalOpen(false);
    console.log("Selected categories:", selected);
  };
  return (
    <div className="template-wrapper">
      <div className="template-background" />
      <div className="template-content">
        <Title
          className="gradient-text-blue"
          style={{ textAlign: "center", marginTop: 40 }}
        >
          Explore Website Templates
        </Title>

        <Row justify="center" style={{ marginBottom: 30 }}>
          <Col xs={22} sm={16} md={12}>
            <form
              className="tempalte-search-form"
              onSubmit={(e) => {
                e.preventDefault();
                // Optionally handle submit logic here
              }}
            >
              <Input
                placeholder="Search millions of templates"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                size="large"
                allowClear
                prefix={<SearchOutlined />}
              />
            </form>
          </Col>
        </Row>

        <Row justify="center" gutter={[16, 16]}>
          {categories.map((cat, i) => (
            <Col key={i}>
              <Button
                style={{ background: "rgb(35, 44, 100)", color: "white" }}
                shape="round"
                icon={cat.icon}
                onClick={() => handleCategoryClick()}
              >
                {cat.name}
              </Button>
            </Col>
          ))}
        </Row>

        <Flex
          justify="space-between"
          className="position-relative mx-3"
          align="center"
        >
          <span className="gradient-text-blue-small">
            All Website Templates
          </span>

          <div>
            <span className="gradient-text-blue-small">Sort by</span>
            <Select
              value={sort}
              onChange={(value) => {
                setSort(value);
                setCurrentPage(1); // Reset to first page on sort
              }}
              style={{ width: 100 }}
            >
              <Option value="name"> Name</Option>
              <Option value="category"> Category</Option>
            </Select>
          </div>
        </Flex>

        <Row gutter={[16, 16]} justify="center" style={{ margin: 5 }}>
          {paginated.map((template) => (
            <Col key={template.id} xs={24} sm={12} md={8} lg={6}>
              <Card
              onClick={()=>navigate("/preview/"+template.id)}
                hoverable
                className="template-card"
                cover={
                  <img
                    alt={template.name}
                    src={template.thumbnail}
                    className="template-card-cover"
                  />
                }
                styles={{ body: { padding: 10 } }}
              >
                <h4 className="template-card-title my-1">{template.name}</h4>
                <p className="template-card-category my-1">
                  Category: {template.category}
                </p>
                <a
                  href={`/preview/${template.id}`}
                  className="template-card-link"
                >
                  Preview Template →
                </a>
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="center" style={{ marginTop: 24 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filtered.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </Row>
      </div>
      {categoryModalOpen && (
        <TemplateCategouriesModal
          visible={categoryModalOpen}
          onApply={handleFilterSubmit}
          onCancel={handleCancelFilterModal}
          initialSelected={selectedCategories}
        />
      )}
    </div>
  );
};

export default WebsiteTemplateScreen;
