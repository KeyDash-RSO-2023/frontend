import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="col">
        <Link to="/frontend" className="link_style"> 
          <img src={logo} />
          <p className="title">KeyDash</p>
        </Link>
      </div>
      <div>
        <div className="profile float-right">
          <Link to="/frontend/profile/1" className="link_style">Profile</Link>
        </div>
        <div className="about">
          <Link to="/frontend/about" className="link_style">About</Link>
        </div>
        <div>
          <Link to="/frontend/login" className="link_style">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
