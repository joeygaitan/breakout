

let boxScript = document.querySelector('.boxScript');

let valueBoxScript = boxScript.getContext('2d');

// valueBoxScript.beginPath();
// valueBoxScript.rect(20, 40, 50, 50);
// valueBoxScript.fillStyle = "#0095DD";
// valueBoxScript.fill();
// valueBoxScript.closePath();

// valueBoxScript.beginPath();
// valueBoxScript.arc(240, 160, 20, 0, Math.PI*2, false);
// valueBoxScript.fillStyle = "green";
// valueBoxScript.fill();
// valueBoxScript.closePath();

// valueBoxScript.beginPath();
// valueBoxScript.rect(160, 10, 100, 40);
// valueBoxScript.strokeStyle = "rgba(0, 0, 255, 0.5)";
// valueBoxScript.stroke();
// valueBoxScript.closePath();

var x = boxScript.width/2;
var y = boxScript.height-30;
var dx = 2;
var dy = -2;

const drawBall = () =>{
    valueBoxScript.beginPath();
    valueBoxScript.arc(x, y, 10, 0, Math.PI*2);
    valueBoxScript.fillStyle = "#0095DD";
    valueBoxScript.fill();
    valueBoxScript.closePath();
}

const draw = () => {
    valueBoxScript.clearRect(0, 0, boxScript.width, boxScript.height);
    drawBall();
    x += dx;
    y += dy;
}
setInterval(draw, 10);

// for(let i =1;i<=12;i++){
//     const x = (100 * i % 3) + 30
//     const y = 100 * Math.floor(100 / i)



//     // if(i>=4){

//     // }else if(i>4 && i<=8){

//     // }else if(i>8 && i<=12){

//     // }
// }

//responsive web formula
//1. listen for changes in window size
//2. update size of canvas
//3. notifiy program about new canvas size