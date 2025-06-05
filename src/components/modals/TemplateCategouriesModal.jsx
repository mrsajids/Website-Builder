import React, { useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Divider,
  Space,
} from "antd";
import {
  AppstoreOutlined,
  RocketOutlined,
  StarOutlined,
  ShopOutlined,
  BulbOutlined,
  LaptopOutlined,
  CameraOutlined,
  SolutionOutlined,
  HomeOutlined,
  SmileOutlined,
  ReadOutlined,
  GlobalOutlined,
  MailOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const categories = [
  { name: "All Categories", icon: <AppstoreOutlined /> },
  { name: "Latest", icon: <RocketOutlined /> },
  { name: "Popular", icon: <StarOutlined /> },
  { name: "Business", icon: <ShopOutlined /> },
  { name: "Portfolio", icon: <CameraOutlined /> },
  { name: "E-commerce", icon: <DollarOutlined /> },
  { name: "Marketing", icon: <BulbOutlined /> },
  { name: "Technology", icon: <LaptopOutlined /> },
  { name: "Resume/CV", icon: <SolutionOutlined /> },
  { name: "Real Estate", icon: <HomeOutlined /> },
  { name: "Education", icon: <ReadOutlined /> },
  { name: "Social Media", icon: <SmileOutlined /> },
  { name: "Newsletter", icon: <MailOutlined /> },
  { name: "Blog", icon: <GlobalOutlined /> },
];

const { Text } = Typography;

const FilterCategoriesModal = ({
  visible,
  onCancel,
  onApply,
  initialSelected = [],
}) => {
  const [selected, setSelected] = useState(initialSelected);

  const toggleCategory = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApply(selected);
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title="Filter by Categories"
    >
      <Divider className="my-2" />

      <Space direction="vertical" style={{ width: "100%",marginBottom:10 }}>
        <Row gutter={[16, 16]}>
          {categories.map((cat, index) => (
            <Col xs={24} sm={12} key={index}>
              <Checkbox
                checked={selected.includes(cat.name)}
                onChange={() => toggleCategory(cat.name)}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                {cat.icon}&nbsp;
                <Text>{cat.name}</Text>
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Space>
      <Divider className="my-2" />

      <div style={{ textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleApply}>
          Apply Filter
        </Button>
      </div>
    </Modal>
  );
};

export default FilterCategoriesModal;
