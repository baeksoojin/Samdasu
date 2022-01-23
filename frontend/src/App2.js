import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// url 생성하기 (form/)?

function Form_A(){    // checkbox에서 체크된 항목들을 모두 출력

    const form_b = () => {
        //console.log("1");

         // 선택된 목록 가져오기
        const query = 'input[name="allergy"]:checked';
        const selectedEls = document.querySelectorAll(query);

        // 선택된 목록에서 value 찾기
        let result = '';
        selectedEls.forEach((el)=>{
            result += el.value + ' ';
            //console.log(result);
        })

        console.log(result);

        // 출력하기
        document.getElementById('result').innerText=result;

    }

   
    return(
        <div className="form">
            <input type='checkbox' name='allergy' value='egg'/>egg
            <input type='checkbox' name='allergy' value='milk'/>milk
            <input type='checkbox' name='allergy' value='bean'/>bean
            <input type='checkbox' name='allergy' value='wheat'/>wheat
            <input type='checkbox' name='allergy' value='nut'/>nut
            <input type='checkbox' name='allergy' value='shellfish'/>shellfish
            <input type='checkbox' name='allergy' value='crustacean'/>crustacean
            <button onClick={form_b}>저장하기</button>
            <div id='result'></div>
        </div>
    )

}

export default Form_A; 