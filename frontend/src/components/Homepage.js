import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./logout";
import "./Homepage.css";

const Homepage = () => {
  let navigate = useNavigate();

  const SignIn = () => {
    navigate(`/Signin`);
  };
  const SignUp = () => {
    navigate(`/Signup`);
  };

  const ocr = () => {
      navigate(`/Camera`);
  }

  const Logout_ = () => {
    Logout();
  }

  if(localStorage.getItem("refresh_token")){
    console.log("로그인됨");
  }
  else{
    console.log("로그아웃상태");
  }

  

  

  return (
    <div className="homepage">

        
        <div className="Sign">
            <button className="button1" onClick={SignUp}>회원가입</button>
            <button className="button1" onClick={SignIn}>로그인</button>
            <button className="button1" onClick={Logout_}>로그아웃</button>
        </div>
        <div className="main">
          <p>Welcome to "samdasu"</p>
          <p>OCR을 활용해 음식속 알레르기 유발성분을 체크합니다.</p>
        </div>
        <div className="OCR">
            <button className="button2" onClick={ocr}>Camera</button>
        
        </div>



    </div>
    
  );
};

export default Homepage;