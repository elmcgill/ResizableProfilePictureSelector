let img = document.getElementById("image");

let slider = document.getElementById("slider");

slider.addEventListener('input', resize);

let marginLeft = 0;
let marginTop = 0;
let height = img.naturalHeight;
let width = img.naturalWidth;
let sliderValue = 0;


console.log(img.naturalHeight);
console.log(img.naturalWidth);

if(height > width){
    console.log("calculating height");
    let ratio = height/width;
    img.style.minWidth = "468px";
    img.style.height = `${Math.floor(468 * ratio)}px`;
    width=468;
    height=Math.floor(468 * ratio);
} else {
    console.log("calculating width");
    let ratio = width/height;
    img.style.height = "468px";
    img.style.minWidth = `${Math.floor(468 * ratio)}px`;
    width=Math.floor(468 * ratio);
    height= 468;
}

console.log(height);
console.log(width);

function resize(e){
    let value = +e.target.value;
    sliderValue = +e.target.value;
    img.style.height = `${height + value}px`;
    img.style.minWidth = `${width + value}px`;

    console.log(`height: ${height + value}px, width: ${width + value}px`);

    let maxLeftMargin = ((width + value) - 468);
    let maxTopMargin = (((height + value) - 468)/2);
    console.log(maxTopMargin);

    if(Math.abs(marginLeft) >= maxLeftMargin){
        if(marginLeft <0){
            marginLeft = -(maxLeftMargin);
        } else {
            marginLeft = maxLeftMargin;
        }
    }

    if(Math.abs(marginTop) >= maxTopMargin){
        if(marginTop <0){
            marginTop = -(maxTopMargin);
        } else {
            marginTop = maxTopMargin;
        }
    }

    img.style.marginLeft = marginLeft + "px";
    img.style.marginTop = marginTop + "px";
}

let wrapper = document.getElementById('wrapper');

wrapper.addEventListener('mousedown', imageClicked);

function imageClicked(e){

    window.addEventListener('mousemove', imageMove);
    window.addEventListener('mouseup', imageDoneMoving);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function imageMove(e){

        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        const rect = wrapper.getBoundingClientRect();
        console.log(`marginLeft: ${marginLeft}, marginTop: ${marginTop}`);
        
        marginLeft -= newX;
        marginTop -= newY;
        

        let maxLeftMargin = ((width + sliderValue) - 468);
        let maxTopMargin = (((height + sliderValue) - 468)/2);


        if(Math.abs(marginLeft) >= maxLeftMargin){
            if(marginLeft <0){
                marginLeft = -(maxLeftMargin);
            } else {
                marginLeft = maxLeftMargin;
            }
        }
    
        if(Math.abs(marginTop)+ 468 >= height + sliderValue){
            if(marginTop <0){
                marginTop = -(height + sliderValue - 468);
            } else {
                marginTop = height + sliderValue - 468;
            }
        }
    
        /*
        if(Math.abs(marginTop)+467 < height + sliderValue){
            marginTop -= newY;
            
        } else {
            marginTop = height - 467;
        }
        */

        img.style.marginLeft = marginLeft + "px";
        img.style.marginTop = marginTop + "px";

        prevX = e.clientX;
        prevY = e.clientY;

        createImageLink()
    }

    function imageDoneMoving() {
        window.removeEventListener('mousemove', imageMove);
        window.removeEventListener('mouseup', imageDoneMoving);
    }
}

const canvas = document.getElementById('image-canvas');
const context = canvas.getContext('2d');


const btn = document.getElementById('img-btn');
btn.addEventListener('click', createImageLink);

function createImageLink(){
    let image = new Image();
    //image.src = img.src;
    //image.width = width;
    //image.height = height;
    console.log(img);
    canvas.width=468;
    canvas.height=468;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, 468, 468, 0, 0, 468, 468);
    //context.drawImage(img, /*((width+sliderValue) - 468 - marginLeft)*/0 , /*((height + sliderValue) - 468 - marginTop)*/0, 800, 1200, 0,0, 468, 468);
    let tempLink = document.createElement('a');
    let fileName = `image-cropped.jpg`;
    tempLink.download = fileName;
    tempLink.href = document.getElementById('image-canvas').toDataURL("image/jpeg", 0.9);
    tempLink.click();
}