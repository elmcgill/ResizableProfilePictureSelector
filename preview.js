let imageTag = document.getElementById("image");
let canvasTag = document.getElementById("canvas");
const canvasCtx = canvasTag.getContext("2d");
let fileInput = document.getElementById("fileInput");
let valueInput = document.getElementById("valueInput");
valueInput.addEventListener('input', resize);

fileInput.addEventListener('change', getImage);

let height, width, imageRatio;
let heightO, widthO;
let scaleX, scaleY;
let img;

function setHeightWidth(h, w) {
    if (h > w) {
      imageRatio = h / w;
      width = 468;
      height = Math.round(imageRatio * 468);
    } else {
      //landscape mode
      imageRatio = w / h;
      width = Math.round(imageRatio * 468);
      height = 468;
    }

    scaleX = width / widthO;
    scaleY = height / widthO;
  
    console.log(`New height: ${height}, width: ${width}`);
    console.log(`Width scaled by: ${scaleX}, height scaled by: ${scaleY}`);
    imageTag.width = width;
    imageTag.height = height;
    img.width = width;
    img.height = height;
    console.log(`img height: ${imageTag.height}, width: ${imageTag.width}`);
}

function setCanvas(i, h, w){
    canvasTag.width = 468;
    canvasTag.height = 468;
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

    console.log(`In setCanvas, image size: ${i.height} x ${i.width}`);

    canvasCtx.drawImage(i, 0, 0, 97, 97, 
        0, 0, 468, 468);
    //canvasCtx.drawImage(img, 0,0,w,h);
}

function getImage(e){
    if(fileInput.files && fileInput.files[0]){
        let file = fileInput.files[0];
        img = new Image();
        img.onload = function () {
            console.log(this);
            console.log(`Old height: ${this.height}, width: ${this.width}`);
            heightO = this.height;
            widthO = this.width;
            setHeightWidth(this.height, this.width);
            setCanvas(this, height, width);
        };
        img.src = URL.createObjectURL(file);
        imageTag.src = URL.createObjectURL(file);
    }
}

function resize(e){
    let value = +e.target.value;
    console.log(`height: ${height + value}, width: ${width + value}`);
    setCanvas(img, height + value, width + value);
    imageTag.width = width + value;
    imageTag.height = height + value;
    img.width = width + value;
    img.height = height + value;
    scaleX = width + value / widthO;
    scaleY = height + value / heightO;
}