import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Authentication from "../logincheck";
import { useNavigate } from "react-router-dom";
import "./Camera.css";

function Camera({}){


    const BaseURL = 'http://127.0.0.1:8000/imageshow/';

    const axiosInstanceCam= axios.create({
        baseURL: BaseURL,
        timeout: 5000,
        headers: {
            'Authorization': "JWT " + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }, 
    });

    let navigate = useNavigate();

    const Login = () => {
        console.log(
            "로그인후에 사용해주세요"
        )
        navigate(`/Signin`);
    };

    const Homepage = () => {
        navigate(`/`);
    };

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto,setHasPhoto] = useState(false);
    const [urlPhoto,setUrlPhoto] = useState('');
    const [Text,setText] = useState("");
    const [hasallergy,setAllergy] = useState(false);


    useEffect(()=>{
        const check = Authentication()
        console.log(check);

        if(check==false){
            alert("로그인후 이용해주세요.");
            Login();
        }
        else{
            axiosInstanceCam.defaults.headers['Authorization'] = "JWT " +localStorage.getItem('access_token');
        }
    });


    

    const StartCam = ()=>{
        navigator.mediaDevices
        .getUserMedia({
            video : {width:300, height:300}
        })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.log("login페이지로이동");
            // console.err(err);
        })

    }

    useEffect(()=>{
        StartCam();
    },[videoRef]);

    const takePhoto = ()=>{
        const width  =120;
        const height = 120;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        //photo를 db에 저장하고 db에서 꺼내와서 getContext('2d');를 적용하면 됨..

        let ctx = photo.getContext('2d');
        ctx.drawImage(video,0,0,width,height);
        setHasPhoto(true);

        const image = photo.toDataURL('image/jpeg');
        setUrlPhoto(image);
        console.log(photo);

    }

   
    const putData = ()=>{
        console.log(hasPhoto);
        if(!hasPhoto) {
            console.log('No Data Here');
            alert("제목과 확인번호를 입력해주시기 바립니다.")
        }else {
            console.log('good to go');
            console.log('urlphoto :'+ urlPhoto);

           
           
            axiosInstanceCam.post('/', {image_url: urlPhoto})
              .then(res => {
                console.log(res);
                axiosInstanceCam.get('/')
                .then(response => {
                    console.log(response);

                    console.log("======사진속 음식에 존재하는 알레르기 유발 성분======");

                    if(response.data.check == true)
                    {   
                        setAllergy(true);
                        
                        console.log(response.data.allergies);
                        console.log("======[user]님이 입력한 알레르기 유발 성분이 존재합니다.======");
                        console.log(response.data.warn);
                        let i=0;
                        let view_data = "";
                        for(i; i<response.data.warn.length; i++){
                            console.log(response.data.warn[i]);
                            if(i==0) view_data = response.data.warn[i];
                            else view_data = view_data + "  와  " + response.data.warn[i];
                            
                        }
                        
                        console.log(view_data);
                        
                         // 출력하기
                        if(view_data){
                            setText(view_data);
                            document.getElementById('allergies').style.display='';
                            document.getElementById('allergies').innerText=response.data.allergies;
                            document.getElementById('view').innerText=
                            view_data +"알레르기가 있는 당신! 조심하세요!";
                        }
                        
                    
                    }
                    else{
                        console.log("======알레르기 유발성분이 존재하지 않습니다=========");
                    }

                  })

              })
            
            .catch(err=> console.log(err));
        }

    }



    return(
        <div className="Cam">
            <div className = "TopBar">
                <labe1 >samdasu</labe1>  
            </div><br/>
            <span>
            <div className="VideoCam">
                <video ref={videoRef}></video>
                <button className="Button" onClick={takePhoto}>Click</button>
            </div>
            <div className = {"Photo" + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button className="Button" onClick={putData}>submit</button>
            </div>
            {
            hasallergy === true
            ? <p className = "Showalldata" id='allergies'></p>
            : null
            }
            
            <div className = "Showdata" id='view'></div>

            </span>
            
              
        </div>


    )
}

export default Camera; 