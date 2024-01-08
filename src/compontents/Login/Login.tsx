import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login, register } from "../../services/login";
import { useAuth } from '../AuthContext/AuthContext';

import "./Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', surname: '', age: '', email: '', password: '' });
  const [ isLoggedIn, setIsLoggedIn ] = useAuth();


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
      localStorage.setItem('session', JSON.stringify(session));
      navigate('/frontend/profile');
    } else {
      setError('Wrong credentials');
    }

    setIsLoggedIn(true);
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const session = await register(registerData); 

    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
      navigate('/frontend/profile/' + session.userId);
    } else {
      setError('Wrong credentials');
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
    <div className="container">
        <div className="row">
            <div className="col col-md-4">
                <form onSubmit={handleLogin}>
                    <div className="title">
                        login
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="email" onChange={handleLoginChange} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" onChange={handleLoginChange} />
                    </div>
                    <div>
                        <input type="submit" value="login" />
                    </div>
                </form>
            </div>

            <div className="col col-md-4">
                <form onSubmit={handleRegister}>
                    <div className="title">
                        register
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="name" onChange={handleRegisterChange} />
                    </div>
                    <div>
                        <input type="text" name="surname" placeholder="surname" onChange={handleRegisterChange}/>
                    </div>
                    <div>
                        <input type="text" name="age" placeholder="age" onChange={handleRegisterChange}/>
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="email" onChange={handleRegisterChange}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" onChange={handleRegisterChange}/>
                    </div>
                    <div>
                        <input type="submit" value="register" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    
  );
};

export default Login;