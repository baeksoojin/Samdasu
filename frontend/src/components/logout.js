import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


const Logout = () => {

    let navigate = useNavigate();

    const Homepage = () => {
        navigate(`/`);
    };
    

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("refresh_token"));
        axiosInstance.post('/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        }).then(()=>{
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
        }).then(
            Homepage
        );
       


    };

    return (
    <div className="logout">
            <div style={{marginTop:10}}>
                <button type="primary" onClick={onSubmit}>로그아웃</button>
            </div>
    </div>
    );
    

}

export default Logout;
