import Profile from "../Profile/Profile";
import Home from "../Home/Home";
import About from "../About/About";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Login from "../Login/Login";
import { AuthProvider } from "../AuthContext/AuthContext";
import Admin from "../Admin/Admin";

function App() {
  return (
    <div className="app-content">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
