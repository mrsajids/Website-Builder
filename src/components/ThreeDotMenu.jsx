import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons"; // Ant Design's more icon
import PropTypes from "prop-types"; // Import PropTypes for type checking

const ThreeDotMenu = ({ menuItems, onMenuItemClick, placement }) => {
  // Function to handle menu item click
  const handleMenuClick = (e, item) => {
    onMenuItemClick(e.key, item); // Call the passed function with the key of the clicked item
  };

  // Create the menu items array for Dropdown
const items = menuItems.map((item, index) => ({
  key: String(index + 1),
  label: (
    <span>
      {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
      {item.label}
    </span>
  ),
}));


  return (
    <Dropdown
      size="large"
      menu={{ items, onClick: handleMenuClick, style: { width: "8rem" } }}
      trigger={["click"]}
      placement={placement || "bottomRight"}
    >
      <Button
        icon={<MoreOutlined />}
        // shape="circle"
        type="text"
        className="three-dot-button"
      />
    </Dropdown>
  );
};

// Typechecking for props
ThreeDotMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node, // React node allows you to pass JSX (e.g., an icon)
    })
  ).isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
  placement: PropTypes.string,
};


export default ThreeDotMenu;
