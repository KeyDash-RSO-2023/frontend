import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/login";
import { useAuth } from "../AuthContext/AuthContext";

import styles from "./Login.module.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    age: "",
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useAuth();
  console.log(isLoggedIn);

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const session = await login(loginData);

    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
      navigate("/profile");
    } else {
      setError("Wrong credentials");
    }

    setIsLoggedIn(true);
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const session = await register(registerData);

    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
      navigate("/profile");
    } else {
      setError("Wrong credentials");
    }

    setIsLoggedIn(true);
    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.col} ${styles.colmd4}`}>
          <form onSubmit={handleLogin}>
            <div className={styles.title}>login</div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="email"
                placeholder="email"
                onChange={handleLoginChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="password"
                onChange={handleLoginChange}
              />
            </div>
            <div>
              <input
                className={`${styles.submit} ${styles.input}`}
                type="submit"
                value="login"
              />
            </div>
          </form>
        </div>

        <div className={`${styles.col} ${styles.colmd4}`}>
          <form onSubmit={handleRegister} style={{ alignItems: "end" }}>
            <div className={styles.title}>register</div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="name"
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="surname"
                placeholder="surname"
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="age"
                placeholder="age"
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="email"
                placeholder="email"
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="password"
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <input
                className={`${styles.submit} ${styles.input}`}
                type="submit"
                value="register"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
