import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function FileUpload() {

  console.log("let's start");
  const navigate = useNavigate();
  const [userID,setUserID] = useState(null);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const authToken = localStorage.getItem("authtoken");
        console.log("WE got token",authToken);
        if (!authToken) {
          navigate("/login");
          return;
        }
        
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, { token: authToken });
        console.log("We got the data",response.data); // Assuming the server responds with some data upon successful verification
        setUserID(response.data['userID']);
      } catch (error) {
        console.log("Error verifying token:", error);
        navigate("/login");
      }
    };
    
    verifyToken();
  }, [navigate]);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    console.log("userid is set to ",userID);
    formData.append("userID", userID);

    try{
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData);
      console.log(res);
      setImageURL(URL.createObjectURL(file)); // Display uploaded file
    }catch(error){
      alert(error);
      console.log("Internal server Error",error);
    }

  }

  return (
    
    <div className="container">
      
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">OnlineUpload</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    { userID && // Use logical AND operator here
                        <form className="form-inline my-2 my-lg-0">
                            <Link to="/login">
                                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => {
                                    localStorage.clear();
                                    setUserID(null);
                                }}>Log Out</button>
                            </Link>
                        </form>
                    }
                </div>
            </nav>
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">File Upload</h3>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="inputGroupFile" onChange={handleFile} />
                  <label className="custom-file-label" htmlFor="inputGroupFile">{fileName || 'Choose file'}</label>
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
              </div>
              {imageURL && (
                <div className="mt-3">
                  <p>Uploaded File: {fileName}</p>
                  <img src={imageURL} alt="Uploaded" className="img-fluid" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
