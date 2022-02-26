import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


const Signin = () => {

    let navigate = useNavigate();

    const Homepage = () => {
        navigate(`/`);
    };

    const Camera = () => {
        navigate(`/Camera`);
    };

    const Signup = () => {
        navigate(`/Signup`);
    }
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
     
        console.log({
            email,
            password,
        });

        const user_data = {
            email: email,
            password: password,
        };
        const user_ldata = {
            email: email,
            pw: password,
        };


        axiosInstance.post('token/',user_data).then((res)=>{
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;

            console.log(res);
            console.log(res.data);
            axiosInstance.get('user/data').then(res=>{console.log(res);}).then(
                
                Camera
            )

        });

      
        
    };


    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
    <div className="signip">
            <div>
                <label >email</label><br/>
                <input name="user-id" value={email} required onChange={onChangeEmail} />
            </div>
            <div>
                <label >비밀번호</label><br/>
                <input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            
            <div style={{marginTop:10}}>
                <button type="primary" onClick={onSubmit}>로그인하기</button>
                <button type="primary" onClick={Homepage}>홈으로</button>
            </div>
            <div style={{marginTop:10}}>
                <p>아직 계정이 없으신가요?</p>
                <button type="primary" onClick={Signup}>회원가입</button>
            </div>
        </div>
    );
    

}

export default Signin;
