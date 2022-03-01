import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {

    let navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const allergy = Allergy();
        console.log(allergy);

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
            allergy: allergy,
        };

        axios.post('http://127.0.0.1:8000/api/user/signup',user_data).then(
            navigate(`/`)
        )
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

    // Allergy check form
    const  Allergy= () => {
        // 선택된 목록 가져오기
       const query = 'input[name="allergy"]:checked';
       const selectedEls = document.querySelectorAll(query);

       // 선택된 목록에서 value 찾기
        let result = '';
        selectedEls.forEach((el)=>{
            result += el.value + ' ';
        })

        console.log(result);
        return result;

    }

    return (
    <div className="signup">
            <div className = "TopBar">
                <label>samdasu</label>
            </div><br/>
            <div className="input">
                <label className="label">email</label><br/>
                <input className="user" name="user-id" value={email} required onChange={onChangeEmail} />
            </div><br/>
            <div>
                <label className="label">name(닉네임)</label><br/>
                <input className="user" name="user-nick" value={name} required onChange={onChangeName} />
            </div><br/>
            <div>
                <label className="label">password</label><br/>
                <input className="user"  name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div><br/>
            <div>
                <label className="label">password check</label><br/>
                <input className="user"  name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordChk} />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </div><br/><br/>
            <div className="form" style = {{marginTop:20}}>
                <label className="label">Allergy Check (알러지 항목 체크)</label>
                <input className = 'checkbox' type='checkbox' name='allergy' value='egg'/>egg
                <input className = 'checkbox' type='checkbox' name='allergy' value='milk'/>milk
                <input className = 'checkbox' type='checkbox' name='allergy' value='bean'/>bean
                <input className = 'checkbox' type='checkbox' name='allergy' value='wheat'/>wheat
                <input className = 'checkbox' type='checkbox' name='allergy' value='nut'/>nut
                <input className = 'checkbox' type='checkbox' name='allergy' value='shellfish'/>shellfish
                <input className = 'checkbox' type='checkbox' name='allergy' value='crustacean'/>crustacean
            </div><br/><br/><br/>

            <div style={{marginTop:10}}>
                <button className = "button3" type="primary" onClick={onSubmit}>가입하기</button>
             </div><br/><br/>

        </div>

    
    );
    

}

export default Signup;;