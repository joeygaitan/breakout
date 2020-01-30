const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Ball{
    constructor(radius = 10, color = 'red') {
      this.color = color
      this.ballRadius = radius
      this.x = 0
      this.y = 0
      this.dx = 2
      this.dy = 2
    }

    render = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    move = () => {

    }
  }
    
class Paddle {
    constructor(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath()    
    }

    render = (ctx) => {

    }
}
class Brick {
    constructor(){
      
    };

    render = (ctx) => {

    }
}

class Background {
    constructor(){

    }
}
  
class Score {
    constructor(){

    }
}

class Lives {
    constructor(){

    }
}
  class Game {
    constructor(){

    }
}