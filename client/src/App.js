import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import FileUpload from './pages/upload.js';

function App() {
  return (
    
    <div>
      
      <BrowserRouter>
          <Routes>
          
          <Route path="/" element={<FileUpload/>} />
            
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
