const Authentication = () => {

    if(localStorage.getItem("refresh_token")){
        console.log("login : 접근가능");
        return true;
    }
    else{
        console.log("logout삳태 :  아니여서 접근불가능");
        return false;
    }
    

}

export default Authentication;