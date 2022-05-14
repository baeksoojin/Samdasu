import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axios";
import { useNavigate } from 'react-router-dom';
import {Title,Input, Checkbox, Label,Button2, S2Div, Div,Label2 } from "./AccountElements";
axios.defaults.withCredentials = true;

const Signin = () => {

    let navigate = useNavigate();

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
            axiosInstance.get('user/data').then(res=>{
                localStorage.setItem('allergy',res.data.allergy);
                localStorage.setItem('name',res.data.name);                
                console.log(res);
            }).then(Camera)

        });

      
        
    };


    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
    <S2Div className="signip">
        <Div>
            <Label className="label" >email</Label>
            <Input className="user" name="user-id" value={email} required onChange={onChangeEmail} />
            <Label className="label" >password</Label>
            <Input className="user" name="user-password" type="password" value={password} required onChange={onChangePassword} />
            <p></p>
            <Button2 className="button3" type="primary" onClick={onSubmit}>로그인하기</Button2>
            <p className="label2">아직 계정이 없으신가요?</p>
            <Button2 className="button3" type="primary" onClick={Signup}>회원가입</Button2>
        </Div>
    </S2Div>
    );
    

}

export default Signin;
