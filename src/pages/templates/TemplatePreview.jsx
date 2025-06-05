import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "antd";

const templateData = [
  {
    id: 1,
    name: "Modern Website",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/016/547/646/non_2x/creative-website-template-designs-illustration-concepts-of-web-page-design-for-website-and-mobile-website-vector.jpg",
    category: "Website",
    url: "https://example.com/live-template-preview",
  },
  // Add more templates here if needed
];

const TemplatePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = templateData.find((t) => t.id.toString() === id);

//   if (!template) {
//     return <div style={{ padding: 20 }}>Template not found</div>;
//   }

  return (
    <div style={{ padding: 20 }}>
      <Button type="text" onClick={() => navigate(-1)} style={{ marginBottom: 5 }}>
        ← Back
      </Button>

      {template ? (
        <Card
          title={template.name}
          extra={<span>Category: {template.category}</span>}
          style={{ marginBottom: 20 }}
        >
          <iframe
            src={template.url}
            title={template.name}
            width="100%"
            height="600px"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </Card>
      ) : (
        <div style={{ padding: 20 }}>Template not found</div>
      )}
    </div>
  );
};

export default TemplatePreview;
