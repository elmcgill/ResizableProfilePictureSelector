import { useRef, useEffect, useState } from "react"

import './ImageEditor.css';

export const ImageEditor = ({image, value, passCoords}) => {

    const imageRef = useRef(null);

    const [nativeHeight, setNativeHeight] = useState(0);
    const [nativeWidth, setNativeWidth] = useState(0);
    const [calculatedHeight, setCalculatedHeight] = useState(0);
    const [calculatedWidth, setCalculatedWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);
    const [currentWidth, setCurrentWidth] = useState(0);
    const [scaleX, setScaleX] = useState(0);
    const [scaleY, setScaleY] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const [marginTop, setMarginTop] = useState(0);
    const [maxLeftMargin, setMaxLeftMargin] = useState(0);
    const [maxTopMargin, setMaxTopMargin] = useState(0);
    const [previewX, setPreviewX] = useState(0);
    const [previewY, setPreviewY] = useState(0);

    const imageLoaded = (e) => {
        //console.log("image loaded");
        let nHeight = e.target.naturalHeight;
        let nWidth = e.target.naturalWidth;
        //console.log(`${nHeight} , ${nWidth}`);
        if(nHeight !== nativeHeight && nWidth !== nativeWidth){
            //console.log("new image");
            setNativeHeight(nHeight);
            setNativeWidth(nWidth);
            calculateDimensions(nHeight,nWidth);
            imageRef.current.style.marginLeft = "0px";
            imageRef.current.style.marginTop = "0px";
        }
    }

    function imageClicked(e){
        //console.log('image is clicked');
        window.addEventListener('mousemove', imageMove);
        window.addEventListener('mouseup', imageDoneMoving);

        let prevX = e.clientX;
        let prevY = e.clientY;

        function imageMove(e){
            //console.log("move the image");

            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            let marginX = +imageRef.current.style.marginLeft.split("p")[0];
            let marginY = +imageRef.current.style.marginTop.split("p")[0];

            //console.log(marginX, marginY);

            marginX -= newX;
            marginY -= newY;

            
            if(Math.abs(marginX) >= maxLeftMargin){
                if(marginX <0){
                    marginX = -(maxLeftMargin);
                } else {
                    marginX = maxLeftMargin;
                }
            }
        
            if(Math.abs(marginY) >= maxTopMargin){
                if(marginY <0){
                    marginY = -(maxTopMargin);
                } else {
                    marginY = maxTopMargin;
                }
            }
            

            //console.log(`left: ${marginX}, top ${marginY}`);

            setMarginLeft(marginX);
            setMarginTop(marginY);

            prevX = e.clientX;
            prevY = e.clientY;
            
        }

        function imageDoneMoving(){
            window.removeEventListener('mousemove', imageMove);
            window.removeEventListener('mouseup', imageDoneMoving);
        }
    }

    function calculateDimensions(h,w){
        //console.log("in calculate");
        let width;
        let height;
        let ratio;
        if(h > w){
            ratio = h/w;
            width = 468;
            height = Math.round(468 * ratio);
            setCalculatedWidth(width);
            setCalculatedHeight(height);
            setScaleX(width/w);
            setScaleY(height/h);
            setCurrentWidth(width);
            setCurrentHeight(height);
        } else {
            ratio = w/h;
            width = Math.round(468 * ratio);
            height = 468;
            setCalculatedWidth(width);
            setCalculatedHeight(height);
            setScaleX(width/w);
            setScaleY(height/h);
            setCurrentWidth(width);
            setCurrentHeight(height);
        }

        imageRef.current.width = width;
        imageRef.current.height = height;
    }

    function resize() {
        let width = calculatedWidth + value;
        let height = calculatedHeight + value;
        //console.log("in resize: width:" +width + " height: " + height);
        setCurrentWidth(width);
        setCurrentHeight(height);
        setScaleX(width/nativeWidth);
        setScaleY(height/nativeHeight);

        let maxMarginX = (width - 468)/2;
        let maxMarginY = (height - 468)/2;
        setMaxLeftMargin(maxMarginX);
        setMaxTopMargin(maxMarginY);

        if(Math.abs(marginLeft) >= maxMarginX){
            if(marginLeft <0){
                setMarginLeft(-maxMarginX);
            } else {
                setMarginLeft(maxMarginX);
            }
        }
    
        if(Math.abs(marginTop) >= maxMarginY){
            if(marginTop <0){
                setMarginTop(-maxMarginY);
            } else {
                setMarginTop(maxMarginY);
            }
        }

        imageRef.current.width = width;
        imageRef.current.height = height;
    }

    function calculateCoords(h, w, mX, mY, v){
        let x;
        let y;
        if(h > w){
            x = 0 - mX + (v/2);
            y = ((h-468)/2) - mY + (v/2);
        } else{
            y = 0 - mY + (v/2);
            x = ((w-468)/2) - mX +(v/2);
        }
        //console.log(`x-pos : ${x}, y-pos: ${y}`);
        //console.log(`ogx: ${x/scaleX}, ogy: ${y/scaleY}`);
        let x2 = Math.round((x + 468)/scaleX);
        let y2 = Math.round((y + 468)/scaleY);
        setPreviewX(Math.round(x/scaleX));
        setPreviewY(Math.round(y/scaleY));
        passCoords(x,y, x2, y2, nativeWidth, nativeWidth);
    }

    useEffect(() => {
        //console.log(`marginX: ${marginLeft}, marginY: ${marginTop}`);
        //console.log(`maxX: ${maxLeftMargin}, maxY: ${maxTopMargin}`);
        console.log(`x: ${scaleX}, y: ${scaleY}`);
        if(calculatedWidth && calculatedHeight){
            //console.log("should be resizing")
            resize();
            //console.log(`height: ${currentHeight} width: ${currentWidth}`);
            imageRef.current.style.marginLeft = marginLeft + "px";
            imageRef.current.style.marginTop = marginTop + "px";
            calculateCoords(calculatedHeight, calculatedWidth, marginLeft, marginTop, value);
        }
    }, [value, nativeHeight, nativeWidth, marginLeft, marginTop, maxLeftMargin, maxTopMargin, calculatedHeight, calculatedWidth])

    return(
        <div className="image-editor" onMouseDown={imageClicked}>
            <div className="image-container">
            </div>
            <div className="image-wrapper" id="wrapper">
                
            </div>
            {   image ? 
                        <img src={image ? URL.createObjectURL(image) : ''} className="pfp" ref={imageRef} onLoad={imageLoaded}/>
                        : <></>
            }
                
        </div>
    )
}