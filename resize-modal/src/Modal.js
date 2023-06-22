import { ImageInput } from './ImageInput';
import { useState, useEffect } from 'react';
import { ImageEditor } from './ImageEditor';

import './Modal.css';
export const Modal = (props) => {
    const {toggle} = props;

    const [image, setImage] = useState(null);
    const [value, setValue] = useState(0);
    const [coords, setCoords] = useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        nW: 0,
        nH: 0
    });
    const [profilePicture, setProfilePicture] = useState('');

    const changeValue = (e) => {
        let val = +e.target.value;
        setValue(val);
    }

    const changeImage = (e) => {
        setImage(e.target.files[0]);
    }

    function changeCoords(x1, y1, x2, y2, nW, nH){
        setCoords({
            x1,
            y1,
            x2,
            y2,
            nW,
            nH
        });
    }

    function preview(){
        let img = new Image();

        img.onload = function(e){
            console.log("test to see if we can get the cropped image");
            let canvas = document.createElement('canvas');
            canvas.width = 468;
            canvas.height = 468;
            let context = canvas.getContext('2d');
            /*
                image: The image to be cropped.
                sourceX: The x-coordinate of the source image
                sourceY: The y-coordinate of the source image.
                sourceW: The width of the source image.
                sourceH: The height of the source image.
                destinationX: The x-coordinate of the destination image.
                destinationY: The y-coordinate of the destination image.
                destinationW: The width of the destination image.
                destinationH: The height of the destination image.
                drawImage(image, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH)
            */
            console.log(canvas);
            console.log(context);
            console.log(img);
        
            context.drawImage(img, coords.x1, coords.y1, coords.x2, coords.y2, 
                0, 0, 468, 468);
            const link = document.createElement('a');
            link.download = 'download.png';
            link.href = canvas.toDataURL("image/png");
            setProfilePicture(canvas.toDataURL("image/png"));
        }

        img.src = URL.createObjectURL(image);

        
    }

    useEffect(()=>{
        console.log(coords);
        console.log(profilePicture)
    }, [value, coords, profilePicture]);

    return(
        <div className="modal">
            <div className="modal-box">
                <div className="modal-top">
                    <button className="modal-top-button" onClick={toggle}>X</button>
                </div>
                <div className="modal-content">
                    <ImageEditor image={image} value={value} passCoords={changeCoords}/>
                </div>
                <div className="modal-bottom">
                    <ImageInput zoom={changeValue} value={value} passImage={changeImage} preview={preview}/>
                </div>
            </div>
        </div>
    )
}