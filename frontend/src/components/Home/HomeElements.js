import styled from 'styled-components';

export const Title = styled.p`
  font-size: 2.2rem;
  font-weight: 800;
  color: #004d40;
  display: table; margin-top:200px; margin-left: auto; margin-right: auto;
`;

export const SubTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: #004d40;
  display: table; margin-top:20px; margin-left: auto; margin-right: auto;
`;

export const Div = styled.div`
    height: 800px;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
    background-image :  linear-gradient(white, rgba(47, 23, 15, 0.3)), url('https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/c9/6b/87/5bc96b870cded2738de6.jpg'); 
    background-size: cover;
`;