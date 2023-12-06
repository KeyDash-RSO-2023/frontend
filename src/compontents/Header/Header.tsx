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
      <div className="col">
        <div className="row">
          <div className="container profile">
            <Link to="/frontend/profile/1" className="link_style">Profile</Link>
          </div>
          <div className="container about">
            <Link to="/frontend/about" className="link_style">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
