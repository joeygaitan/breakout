
let boxScript = document.querySelector('.boxScript');

let valueBoxScript = boxScript.getContext('2d');

valueBoxScript.beginPath();
valueBoxScript.rect(100, 50, 120, 56);
valueBoxScript.fillStyle = "#0095DD";
valueBoxScript.fill();

for(let i =1;i<=12;i++){

    


    const x = (100 * i % 3) + 30
    const y = 100 * Math.floor(100 / i)
    
    document.getElementsByTagName("canvas")[i - 1].setAttribute("class", "rectangle" + i);

    valueAnotherBox.beginPath();

    if(i>=4){

    }else if(i>4 && i<=8){

    }else if(i>8 && i<=12){

    }
    document.querySelector('#blocks').appendChild(boxScript)
}
//responsive web formula
//1. listen for changes in window size
//2. update size of canvas
//3. notifiy program about new canvas size