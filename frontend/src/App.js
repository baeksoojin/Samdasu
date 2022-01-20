import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Camera(){

    const data = {url: "none"};


    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto,setHasPhoto] = useState(false);
    const [urlPhoto,setUrlPhoto] = useState('');
    const [Text,setText] = useState("");


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
            console.err(err);
        })

    }

    useEffect(()=>{
        StartCam();
    },[videoRef]);

    const takePhoto = ()=>{
        const width  =150;
        const height = 150;

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
           
            axios.post('http://127.0.0.1:8000/imageshow/',{image_url: urlPhoto})

              .then(res => {
                console.log(res);
                axios.get('http://127.0.0.1:8000/imageshow/')
                .then(response => {
                    console.log(response);
                    // console.log(response.data);
                    console.log(response.data[response.data.length-1]);
                    setText(response.data[response.data.length-1].text);
                  })

              })
            
            .catch(err=> console.log(err));
        }

    }


    return(
        <div className="camera">
            <div className="video">
            <video ref={videoRef}></video>
            <button className="button" onClick={takePhoto}>Click</button>
            </div>
            <div className = {"photo" + (hasPhoto ? 'hasPhoto' : '')}>
           
              <canvas ref={photoRef}></canvas>
              < button className="button" onClick={putData}>submit</button>  

               
            </div>
        </div>


    )
}

export default Camera; 

// <canvas ref={photoRef}></canvas>
// <button className="button" onClick={putData}>submit</button>