import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


const Logout = () => {


    console.log(localStorage.getItem("refresh_token"));
    axiosInstance.post('/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
    }).then(()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
    });
    
}

export default Logout;
