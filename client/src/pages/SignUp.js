import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    "Name": "",
    "UserName": "",
    "Password": "",
    "PhoneNo": "",
    "Email": "",
    "Address": ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Button clicked", credentials);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, credentials);
      // console.log("Server respond with",response.data);

      if (response.status === 200) {
        if (response.data['status'] === -1) {
          alert(response.data['message']);
          navigate("/signup");
        }
        else {
          alert(response.data['message']);
          navigate("/login");
        }
      }

    }
    catch (error) {
      alert(error);
      navigate("/signup");
      console.log("Error:", error);
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
              <h3>Create a New Account</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control" id="Name" name='Name' onChange={handleChange} placeholder="Enter name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="UserName">UserName</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control" id="UserName" name='UserName' onChange={handleChange} placeholder="Enter username" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Password">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control" id="Password" name='Password' onChange={handleChange} placeholder="Enter your password" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="PhoneNo">Phone Number</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                    <input type="phone" className="form-control" id="PhoneNo" name='PhoneNo' onChange={handleChange} placeholder="Enter phone number" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                    </div>
                    <input type="email" className="form-control" id="Email" name='Email' onChange={handleChange} placeholder="Enter Your email" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Address">Address</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control" id="Address" name="Address" onChange={handleChange} placeholder="Enter Your address" required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
