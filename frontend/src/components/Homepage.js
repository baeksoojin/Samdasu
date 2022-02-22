import React from "react";
import { useNavigate } from "react-router-dom";

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


  return (
    <div className="homepage">

        <div className="main">
           <p>OCR을 활용해 음식속 알레르기 유발성분을 체크합니다.</p>
        </div>
        <div className="Sign">
            <button className="button" onClick={SignIn}>로그인</button>
            <button className="button" onClick={SignUp}>회원가입</button>
        </div>
        <div className="OCR">
            <button className="button" onClick={ocr}>Camera</button>
        
        </div>


    </div>
    
  );
};

export default Homepage;