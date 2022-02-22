import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Signup = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        console.log({
            email,
            password,
            name,
        });

        const user_data = {
            email: email,
            pw: password,
            name: name,
        };

        axios.post('http://127.0.0.1:8000/api/user/signup',user_data)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangePasswordChk = (e) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };

    return (
    <div className="signup">
            <div>
                <label >email</label><br/>
                <input name="user-id" value={email} required onChange={onChangeEmail} />
            </div>
            <div>
                <label >닉네임</label><br/>
                <input name="user-nick" value={name} required onChange={onChangeName} />
            </div>
            <div>
                <label >비밀번호</label><br/>
                <input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
                <label >비밀번호체크</label><br/>
                <input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordChk} />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            
            <div style={{marginTop:10}}>
                <button type="primary" onClick={onSubmit}>가입하기</button>
            </div>
        </div>
    );
    

}

export default Signup;
