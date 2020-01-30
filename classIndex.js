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
  }
    
class Paddle {
    constructor(){
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.paddleX = (canvas.width - paddleWidth) / 2;
    }

    render = (ctx) => {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath()
    }
}
class Brick {
    constructor(){
        this.brickRowCount = 5;
        this.brickWidth = 75;
        this.brickColumnCount = 3;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;

        this.brickX
        this.brickY

        this.bricks = []
    };

    intiateBrickArray = () =>{
        for (let c = 0; c < this.brickColumnCount; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r += 1) {
              this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    render = (ctx) => {
        for (let c = 0; c < this.brickColumnCount; c += 1) {
            for (let r = 0; r < this.brickRowCount; r += 1) {
              if (this.bricks[c][r].status === 1) {
                this.brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                this.brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                this.bricks[c][r].x = brickX;
                this.bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
              }
            }
          }
    }
}

class Background {
    constructor(){

    }
}
  
class Score {
    constructor(){
        this.score = 0;
    }

    render = (ctx) => {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText(`Score: ${score}`, 8, 20);
    }
}

class Lives {
    constructor(){
        this.lives = 3;
    }

    render = (ctx) => {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
    }
}
  class Game {
    constructor(){

    }

    collisionDetection = () => {
        for (let c = 0; c < brickColumnCount; c += 1) {
            for (let r = 0; r < brickRowCount; r += 1) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = 0;
                score += 1;
                if (score === (brickRowCount * brickColumnCount) + (level * 15)) {
                    // eslint-disable-next-line no-alert
                    level += 1;
                    lives += 1;
                    restoreObjects();
                }
                }
            }
            }
        }
      };

    draw = (ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let brick = new Brick()
        brick().intiateBrickArray().render()
        let ball = new Ball()
        ball.render()
        // drawBall();
        let paddle = new Paddle()
        paddle.render()
        // drawPaddle();
        // drawScore();
        let score = new Score()
        score.render()
        // drawLives();
        let lives = new Lives()
        lives.render()
        // drawLevel();
        this.collisionDetection();
      
        if (this.ball.x + this.ball.dx > canvas.width - this.ball.ballRadius || this.ball.x + this.ball.dx < this.ball.ballRadius) {
          this.ball.dx = -this.ball.dx;
        }
        if (this.ball.y + this.ball.dy < this.ball.ballRadius) {
            this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + dy > canvas.height - this.ball.ballRadius) {
          if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth) {
            if (this.ball.ballRadius >= 1.5) {
              this.ball.ballRadius -= 1.5;
            }
            this.ball.dy = -this.ball.dy;
          } else {
            this.paddle.paddleWidth += 15;
            this.paddle.ballRadius += 2;
            this.lives.lives -= 1;
            if (!this.lives.lives) {
              // eslint-disable-next-line no-alert
              alert('GAME OVER');
              document.location.reload();
            } else {
              this.ball.x = canvas.width / 2;
              this.ball.y = canvas.height - 30;
              this.ball.dx = 3;
              this.ball.dy = -3;
              this.paddle.paddleX = (canvas.width - this.paddle.paddleWidth) / 2;
            }
          }
        }
      
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
          paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
          paddleX -= 7;
        }
      
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    };
}

let ball = new Ball()
let bricks = new Bricks()