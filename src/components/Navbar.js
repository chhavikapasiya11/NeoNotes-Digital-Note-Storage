import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ theme, toggleTheme }) {
  let location = useLocation();
  let navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // ✅ Check if token exists

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    navigate("/login"); // ✅ Redirect to login
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NeoNotes</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {/* Dark Mode Toggle */}
            <div className={`form-check form-switch mx-3 ${theme === "dark" ? "text-white" : "text-dark"}`}>
              <input
                className="form-check-input"
                type="checkbox"
                id="themeSwitch"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <label className="form-check-label" htmlFor="themeSwitch">
                <span 
                  style={{ 
                    padding: "5px 10px",
                    borderRadius: "5px",
                    color: theme === "light" ? "black" : "white"
                  }}
                >
                  {theme === "light" ? "Light Mode" : "Dark Mode"}
                </span>
              </label>
            </div>

            {/* Conditional Rendering for Auth Buttons */}
            {!isLoggedIn ? (
              <>
                <Link className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-primary"} mx-3`} to="/login">Login</Link>
                <Link className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-primary"}`} to="/signup">SignUp</Link>
              </>
            ) : (
              <button className="btn btn-danger mx-3" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
