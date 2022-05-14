import React from "react";
import "./App.css";
import Homepage from "./components/Home/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Camera from "./components/Camera";
import Signin from "./components/Account/signin";
import Signup from "./components/Account/signup";
import Navbar from "./components/Navbar/index";


function App() {
  return (
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Camera" element={<Camera />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
         
        </Routes>
      </BrowserRouter>
  );
}

export default App;