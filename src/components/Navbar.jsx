import React, { useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/authContext";
// import './DropdownMenu.css';

const menuData = [
  { label: "Link 1", href: "#" },
  { label: "Link 2", href: "#" },
];

const DropdownMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const wrapperRef = useRef(null);

  const { currentUser, logout } = React.useContext(AuthContext);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <nav className="mainlayout-navbar" ref={wrapperRef}>
      <div className="links">
        <a href="#" className="icon-logo">
          <img src="assets/images/logo/logo.svg" alt="" />
          &nbsp;<span className="logo-header">Web Builder</span>
          {/* <span className="material-symbols-outlined">home_app_logo</span> */}
        </a>

        {/* {menuData.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))} */}

        {/* Text dropdown */}
        {/* <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={() => toggleDropdown('text')}>
            Jane Doe <span className="arrow">{openDropdown === 'text' ? '▲' : '▼'}</span>
          </button>
          <div className={`dropdown-menu ${openDropdown === 'text' ? 'show' : ''}`}>
            <div className="dropdown-header">
              <strong>Jane Doe</strong>
              <em>jane@example.com</em>
            </div>
            <a href="#"><span className="material-symbols-outlined">account_circle</span> Account</a>
            <a href="#"><span className="material-symbols-outlined">settings</span> Settings</a>
            <a href="#"><span className="material-symbols-outlined">help</span> Help</a>
            <hr />
            <a href="#"><span className="material-symbols-outlined">logout</span> Logout</a>
          </div>
        </div> */}

        {/* Avatar dropdown */}
        <div className="dropdown-container">
          <button
            className="dropdown-toggle avatar"
            onClick={() => toggleDropdown("avatar")}
          >
            <span className="user-title">{currentUser.name}</span>
            <img src={currentUser.profileImg} alt="avatar" />
          </button>
          <div
            className={`dropdown-menu slide-down ${
              openDropdown === "avatar" ? "show" : ""
            }`}
          >
            <div className="dropdown-header">
              <strong> {currentUser.name}</strong>
              <em> {currentUser.username}</em>
            </div>
            <a href="#">
              <span className="material-symbols-outlined me-1">account_circle</span>
              Account
            </a>
            <a href="#">
              <span className="material-symbols-outlined me-1">settings</span>
              Settings
            </a>
            <a href="#">
              <span className="material-symbols-outlined me-1">help</span> Help
            </a>
            <hr />
            <a href="#" onClick={logout}>
              <span className="material-symbols-outlined me-1">logout</span> Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DropdownMenu;
