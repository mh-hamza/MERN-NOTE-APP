import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes , useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./context/ContextProvider";

function App() {
 
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
