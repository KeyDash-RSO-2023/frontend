import Profile from "../Profile/Profile";
import Home from "../Home/Home";
import About from "../About/About";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
            <Route path="/frontend" element={<Home />} />
            <Route path="/frontend/profile" element={<Profile />} />
            <Route path="/frontend/about" element={<About />} />
            <Route path="/frontend/login" element={<Login />} />
            <Route path="/frontend/admin" element={<Admin />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
