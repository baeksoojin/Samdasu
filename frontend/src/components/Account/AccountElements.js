import styled from 'styled-components';

export const Label = styled.label`
    margin-left: 40px;
    color: #004d40;
    text-align: center;
    font-weight:300px;
    font-size: 20px;
    
`;

export const Label2 = styled.label`
    margin-left: 5%;
    color: #004d40;
    text-align: center;
    font-weight:300px;
    font-size: 20px;
    
`;

export const Input = styled.input`

    width : 70%;
    line-height: 2rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    border-color: #607d8b;
    border-style: solid;
    border-width: 0 0 2px 6px; /*아래, 왼쪽 선 굵기*/
    word-break: break-all;
    color: #607d8b;

`;

export const Checkbox = styled.input`
    display: inline-block;
`;


export const Button = styled.button`
    color: #009688;
    background-color: rgba(0,0,0,0);
    border: 1px solid #009688;
    padding: 5px;   
    margin-left: 40px;  /* 버튼 사이 간격 */
    padding: 18px 22px;
    font-size: 16px;
    border-radius: 4px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
        }
    
`;

export const Button2 = styled.button`
    display: inline-block;
    color: #009688;
    background-color: rgba(0,0,0,0);
    border: 1px solid #009688;
    padding: 5px;   
    margin-left: 10px;  /* 버튼 사이 간격 */
    // padding: 18px 22px;
    font-size: 5px;
    border-radius: 3px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
        }
    
`;

export const Div = styled.div`
    width: 60%;
    height: 65%;
    padding: 10px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: white;
    box-shadow: 0 10px 25px -10px rgba(0,0,0,0.5);
    border-radius: 5px;
`;

export const SDiv = styled.div`
    height: 1300px;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
    background-image :  linear-gradient(white, rgba(47, 23, 15, 0.3)), url('https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/c9/6b/87/5bc96b870cded2738de6.jpg'); 
    background-size: cover;
    box-sizing: border-box;
    background-color : black;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

export const S2Div = styled.div`
    height: 800px;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
    background-image :  linear-gradient(white, rgba(47, 23, 15, 0.3)), url('https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/c9/6b/87/5bc96b870cded2738de6.jpg'); 
    background-size: cover;
    box-sizing: border-box;
    background-color : black;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;


export const Title = styled.p`
  font-size: 2.2rem;
  font-weight: 800;
  color: #004d40;
  display: table; margin-left: auto; margin-right: auto;
`;