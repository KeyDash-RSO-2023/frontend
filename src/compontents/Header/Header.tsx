import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} />
      <p className="title">KeyDash</p>
    </div>
  );
};

export default Header;
