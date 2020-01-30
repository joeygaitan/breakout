class Ball{
    constructor(radius = 10, color = 'red') {
      this.color = color
      this.x = 0
      this.y = 0
      this.dx = 2
      this.dy = 2
      this.ballRadius = radius
    }
  
    render = (ctx) => {
      const color = this.color
  
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
  }

class Brick {
    constructor(){

    }
}

class Paddle {
    constructor(){
        
    }
}
  
  class Game {
    constructor(idTag){
  
      this.canvas = document.getElementById(idTag),
      this.ctx = getContext('2d')
  
      this.level = 0
      this.lives = 3
      this.score = {current:0,total:0}
  
      this.ball = new Ball('red')
      this.ball.render(this.ctx)
      
      this.ball = {
        ballRadius: 10,
        x: this.canvas.width / 2,
        y: this.canvas.height - 30,
        dx: 2,
        dy: -2
      }
  
      this.paddle = {
        paddleHeight: 10,
        paddleWidth: 75,
        paddleX: (this.canvas.width - paddleWidth) / 2
      }
  
  
    }
  
    ballMovement = () =>{
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        this.ball.dx = -this.ball.dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          if (ballRadius >= 1.5) {
            ballRadius -= 1.5;
          }
          dy = -dy;
        }
      }
    }
  
    drawGame = () =>{
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }