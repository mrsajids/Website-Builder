import { throttle } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TopBar = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const logoTextRef = useRef(null);
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();
  

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!navbarRef.current || !logoRef.current) return;

      const sticky = navbarRef.current.offsetTop;

      if (window.pageYOffset > sticky) {
        navbarRef.current.classList.add("sticky");
        logoRef.current.src = "assets/images/logo/logo-2.svg";
        logoTextRef.current.classList.add("logo-header-dark");
      } else {
        logoTextRef.current.classList.remove("logo-header-dark");
        navbarRef.current.classList.remove("sticky");
        logoRef.current.src = "assets/images/logo/logo.svg";
      }
    }, 500); // Call the function at most once every 100ms

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Empty dependency array means this effect runs once
  const location = useLocation();

  useMemo(() => {
    setActiveLink(location.hash.replace("#", ""));
  }, [location.hash]);

  const handleNavigateToLogin = () => {
    navigate({
      pathname:'/login',
    },{
      state:'navigatetoregister'
    });
  };

  return (
    <>
      <div
        className="navbar-area animate__animated animate__fadeIn animate__delay-1s"
        ref={navbarRef}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">
                  <img
                    ref={logoRef}
                    src="assets/images/logo/logo.svg"
                    alt="Logo"
                  />
                  &nbsp;
                  <span className="logo-header" ref={logoTextRef}>
                    Web Builder
                  </span>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"> </span>
                  <span className="toggler-icon"> </span>
                  <span className="toggler-icon"> </span>
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a
                        className={`page-scroll ${
                          activeLink === "home"|| !activeLink ? "active" : ""
                        }`}
                        href="#home"
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`page-scroll ${
                          activeLink === "features" ? "active" : ""
                        }`}
                        href="#features"
                      >
                        Features
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`page-scroll ${
                          activeLink === "about" ? "active" : ""
                        }`}
                        href="#about"
                      >
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`page-scroll ${
                          activeLink === "facts" ? "active" : ""
                        }`}
                        href="#facts"
                      >
                        Why
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#">Blog</a>
                    </li>
                  </ul>
                </div>
                {/* navbar collapse */}
                <div className="navbar-btn d-none d-sm-inline-block">
                  <Link className="main-btn" to="/login">
                    Login
                  </Link>
                </div>

                <div className="navbar-btn1 d-none d-sm-inline-block ms-1">
                  <a
                    href="#"
                    className="main-btn wow fadeInUp"
                    data-wow-duration="1.3s"
                    data-wow-delay="1.1s"
                    onClick={handleNavigateToLogin}
                  >
                    Get Started
                  </a>
                </div>
              </nav>
              {/* navbar */}
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
    </>
  );
};

export default TopBar;
