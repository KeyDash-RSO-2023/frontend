import Profile from "../Profile/Profile";
import Home from "../Home/Home";
import About from "../About/About";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../Header/Header";

function App() {
  return (
    <div className="app-content">
      <Router>
        <Header />
        <Routes>
          <Route path="/frontend" element={<Home />} />
          <Route path="/frontend/profile" element={<Profile />} />
          <Route path="/frontend/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
