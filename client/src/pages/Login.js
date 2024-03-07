import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    "username": "",
    "password": ""
  });


  useEffect(() => {
    const api_key = process.env.REACT_APP_BACKEND_URL;
    console.log("Write here",api_key,process.env.REACT_APP_BACKEND_URL);
    const verifyToken = async () => {
      try {
        const authToken = localStorage.getItem("authtoken");
        console.log("WE got token", authToken);
        if (!authToken) {
          navigate("/login");
          return;
        }
        
        
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, { token: authToken });
        console.log("We got the data", response.data); // Assuming the server responds with some data upon successful verification
        navigate("/");
      } catch (error) {
        console.log("Error verifying token:", error);
        // navigate("/login");
      }
    };
    
    verifyToken();
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button clicked", credentials);

    try{
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,credentials);
      if(response.status===200 & response.data.status===1){
        localStorage.setItem("authtoken",response.data.authToken);
        alert(response.data.content);
        navigate("/");
      }
      else {
        alert("Incorrect Credentials: Please Enter Correct Credentials")
        navigate("/login");
      }
      
    }
    catch(error){
      alert(error);
      navigate("/login");
      console.log("Error:",error);
    }
    // 

  }
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control" id="username" name='username' onChange={handleChange} placeholder="Enter username" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control" id="password" name='password' onChange={handleChange} placeholder="Password" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>

              <div className="card-body">
              Does not have an account?  <Link to="/signup"> Create One</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}

export default LoginForm;
