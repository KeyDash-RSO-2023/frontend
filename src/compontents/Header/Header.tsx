import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";

const Header = () => {
  const [setSession] = useState(JSON.parse(localStorage.getItem("session")));
  const [isLoggedIn, setIsLoggedIn] = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("session");
    setSession(null);
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/frontend" className="link_style">
          <img src={logo} />
          <p className="title">KeyDash</p>
        </Link>
      </div>
      <div>
        {isLoggedIn && (
          <div className="profile menu-item">
            <Link to="/profile" className="link_style">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
          </div>
        )}

        <div className="about menu-item">
          <Link to="/about" className="link_style">
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="logout menu-item" onClick={handleLogout}>
            <Link to="/login" className="link_style">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </div>
        ) : (
          <div className="login menu-item">
            <Link to="/login" className="link_style">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
