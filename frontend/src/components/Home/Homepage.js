import React from "react";
import {Title, Div,SubTitle} from "./HomeElements";

const Homepage = () => {

  return (
    <div className="homepage">

        <Div className="main">
          <Title>Welcome to "samdasu"</Title>
          <SubTitle> 웹카메라로 사진을 찍어 음식속 알레르기 유발성분을 체크을 확인하세요.</SubTitle>
        </Div>

    </div>
    
  );
};

export default Homepage;