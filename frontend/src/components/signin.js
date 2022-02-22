import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Signin = () => {
    
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
            pw: password,
        };

        axios.post('http://127.0.0.1:8000/api/user/login',user_data).then(res => {
            console.log(res.data.token);
        //api/user/data를 통해서 email과 pw가 일치하는 회원정보를 get해오기.
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
            </div>
        </div>
    );
    

}

export default Signin;
