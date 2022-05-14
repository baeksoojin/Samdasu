import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Title,Input, Checkbox, Label,Button, SDiv, Div,Label2 } from "./AccountElements";

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
    <SDiv className="signup">
            <Div className="form">
                <Title> 회원가입 </Title>
                <Label className="label">email</Label><br/>
                <Input className="user" name="user-id" value={email} required onChange={onChangeEmail} />
                <Label className="label">name(닉네임)</Label><br/>
                <Input className="user" name="user-nick" value={name} required onChange={onChangeName} />
                <Label className="label">password</Label><br/>
                <Input className="user"  name="user-password" type="password" value={password} required onChange={onChangePassword} />
                <Label className="label">password check</Label><br/>
                <Input className="user"  name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordChk} />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                <p></p>
                <Label className="label">Allergy Check (알러지 항목 체크)</Label>
                <Label2><Checkbox className = 'checkbox' type='checkbox' name='allergy' value='egg'/>계란</Label2>
                <Label2><Checkbox className = 'checkbox' type='checkbox' name='allergy' value='milk'/>우유</Label2>
                <Label2><Checkbox className = 'checkbox' type='checkbox' name='allergy' value='bean'/>콩</Label2>
                <Label2><Checkbox className = 'checkbox' type='checkbox' name='allergy' value='wheat'/>밀</Label2>
                <Label2><Checkbox className = 'checkbox' type='checkbox' name='allergy' value='nut'/>견과류</Label2>
                <Label2><Checkbox className = 'checkbox' type='checkbox' name='allergy' value='shellfish'/>조개류</Label2>
                <Label2><Checkbox className = 'checkbox' type='checkbox' name='allergy' value='crustacean'/>갑각류</Label2>
                <p></p><Button className = "button" type="primary" onClick={onSubmit}>가입하기</Button>
            </Div>
        </SDiv>

    
    );
    

}

export default Signup;