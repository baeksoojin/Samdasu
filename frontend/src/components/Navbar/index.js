import React , { useState, useEffect } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Button
  } from './NavbarElements';
import axiosInstance from "../../axios";

const Navbar = () => {

    const [user, setUser] = useState({});
    const [name, setName] = useState('');

    useEffect(() => {
            setInterval(() => {
                const token = localStorage.getItem("access_token");
                const name = localStorage.getItem("name");
                setUser(token);
                setName(name);
                }, [])
    }, 5000);
    
    const Logout = () => {
        console.log(localStorage.getItem("refresh_token"));
        axiosInstance.post('/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        }).then(()=>{
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('name');
            localStorage.removeItem('allergy');
            axiosInstance.defaults.headers['Authorization'] = null;
        });
        
    }

    if (!user) {
        return (
            <Nav>
                <NavLink to = "/">
                    <h1>Samdasu</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to = '/Signup' activeStyle>
                        회원가입
                    </NavLink>
                    <NavLink to = '/Camera' activeStyle>
                        카메라
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signin'>로그인</NavBtnLink>
                </NavBtn>
            </Nav>
                )
            }
    else{
        return(
        <Nav>
            <NavLink to = "/">
                <h1>Samdasu</h1>
            </NavLink>
            <Bars />
            <NavMenu>
                <NavLink to = '/Signup' activeStyle>
                    회원가입
                </NavLink>
                <NavLink to = '/Camera' activeStyle>
                    카메라
                </NavLink>
            </NavMenu>
            <NavBtn>
                <Button onClick={Logout}>로그아웃</Button>
                <p>{name}님</p>
            </NavBtn>
        </Nav>)
    }
}
export default Navbar;