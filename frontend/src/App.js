import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Camera from "./components/Camera";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Logout from "./components/logout";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Camera" element={<Camera />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;