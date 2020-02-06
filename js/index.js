const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Sprite {
  constructor( x, y, height, width){
    this.x = x;
    this.y = y;
    this.height = height
    this.width = width
  }

  randomColor = () => {
   const randomColors = ['red', 'blue', 'green', 'orange', 'yellow', 'lightgray', 'pink','grey','brown'];
   const color = randomColors[Math.floor(Math.random() * randomColors.length)];
   return color; 
  }
}

class Ball extends Sprite {
    constructor(x, y, radius = 10, color = 'red') {
      super(x, y);
      this.color = this.randomColor()
      this.ballRadius = radius
      // this.x = 0
      // this.y = 0
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

// new Ball(10, 20, 33, 'red')
    
class Paddle extends Sprite {
    // new Paddle(10, 75)
    constructor(height, width) {
        super(0, 0, height, width);

        this.paddleX = (canvas.width - this.width) / 2
        console.log(this.paddleX)
    }

    render = (ctx) => {
        ctx.beginPath();
        // console.log(this.paddleX, (canvas.width - this.width) / 2)
        ctx.rect(this.paddleX, (canvas.height - this.height), this.width, this.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath()
    }
}

class Brick extends Sprite {
  constructor(brickX, brickY, width, height, color = '#0095DD'){
    super(width, height)
    this.brickX = brickX
    this.brickY = brickY
    this.brickWidth = width
    this.brickHeight = height
    this.color = color
  }
  render = (ctx) => {
    ctx.beginPath();
    ctx.rect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Bricks extends Sprite{ // 
    constructor(){
       super()

       this.color = this.randomColor()

        this.brickColumnCount = 3,
        this.brickRowCount = 5,
        this.bricks = [],
        this.brickWidth = 75,
        this.brickHeight = 20,
        this.brickPadding = 10,
        this.brickOffsetTop = 30,
        this.brickOffsetLeft = 30
        this.intiateBrickArray()
    };

    restoreObjects = () => {
      this.bricks.map((row) => {
        return row.map((object) => {
          return object.status = 1
        });
      });
    }

    intiateBrickArray = () => {
        for (let c = 0; c < this.brickColumnCount; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r += 1) {
              this.bricks[c][r] = { x: 0, y: 0, status: 1, color:this.color };
            }
        }
    }

    render = (ctx) => {
        for (let c = 0; c < this.brickColumnCount; c += 1) {
            for (let r = 0; r < this.brickRowCount; r += 1) {
              if (this.bricks[c][r].status === 1) {
                // moved to bricks
                this.brickX = (r * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                this.brickY = (c * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                this.bricks[c][r].x = this.brickX;
                this.bricks[c][r].y = this.brickY;                
                // moved to Brick
                let brick = new Brick(this.brickX, this.brickY, this.brickWidth, this.brickHeight, this.bricks[c][r].color)
                
                brick.render(ctx)
                // replace with 
                // this.bricks[c][r].render(ctx)
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
        this.score = 3;
    }

    render = (ctx) => {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText(`Score: ${this.score}`, 8, 20);
        
    }
}

class Level {
  constructor(){
    this.level = 0;
  }

  render = (ctx) => {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Level: ${this.level}`, (canvas.width / 2) - 25, 20);
  }
}

class Lives {
    constructor(){
        this.lives = 3;
    }

    render = (ctx) => {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);
    }
}
  class Game {
    constructor(){
      this.rightPressed = false;
      this.leftPressed = false;
      
      this.bricks = new Bricks()
      // this.bricks.intiateBrickArray()
      this.ball = new Ball( (canvas.width / 2), (canvas.height - 30), 10)
      this.paddle = new Paddle(10, 75)
      this.Level = new Level()
      this.Score = new Score()
      this.Lives = new Lives()

    }

    // function to check for right error key
    keyDownHandler = (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.leftPressed = true;
        }
    };
  
  // this turns off the click from the user input
    keyUpHandler = (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.leftPressed = false;
        }
    };
  
  // this will capture mouse movement
    mouseMoveHandler = (e) => {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
        this.paddle.paddleX = relativeX - this.paddle.width / 2;
        }
    };

    //this checks for collision between the ball and the game
    collisionDetection = () => {
        for (let c = 0; c < this.bricks.brickColumnCount; c += 1) {
            for (let r = 0; r < this.bricks.brickRowCount; r += 1) {
            const b = this.bricks.bricks[c][r];
            if (b.status === 1) {
                if (this.ball.x > b.x && this.ball.x < b.x + this.bricks.brickWidth && this.ball.y > b.y && this.ball.y < b.y + this.bricks.brickHeight) {
                this.ball.dy = -this.ball.dy;
                b.status = 0;
                this.Score.score += 1;
                if (this.Score.score === (this.bricks.brickRowCount * this.bricks.brickColumnCount) + (this.Level.level * 15)) {
                    // eslint-disable-next-line no-alert  )
                    this.Level.level += 1;
                    this.Lives.lives += 1;
                    this.bricks.restoreObjects();
                    if(this.Lives.lives % 5 === 0 || this.Level.level <= 5){
                      if(this.paddle.width > 2) {
                        this.paddle.width -= 2
                      }
                    }
                }
                }
            }
            }
        }
      };

    draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.bricks.render(ctx)
        this.ball.render(ctx)
        this.paddle.render(ctx)        
        this.Score.render(ctx)
        this.Level.render(ctx)
        this.Lives.render(ctx)
        this.collisionDetection(ctx)
      
        if (this.ball.x + this.ball.dx > canvas.width - this.ball.ballRadius || this.ball.x + this.ball.dx < this.ball.ballRadius) {
          this.ball.dx = -this.ball.dx;
        }
        if (this.ball.y + this.ball.dy < this.ball.ballRadius) {
          this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.ballRadius) {
          if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.width) {
            
            if (this.ball.ballRadius >= 1.5) {
              this.ball.ballRadius -= 1.5;
            }
            this.ball.dy = -this.ball.dy;
          } else {
            // ???
            this.paddle.width += 15;
            this.paddle.ballRadius += 2;
            this.Lives.lives -= 1;
            if (!this.Lives.lives) {
              // eslint-disable-next-line no-alert
              alert('GAME OVER');
              document.location.reload();
            } else {
              this.ball.x = canvas.width / 2;
              this.ball.y = canvas.height - 30;
              this.ball.dx = 3;
              this.ball.dy = -3;

              this.paddle.paddleX = (canvas.width - this.paddle.width) / 2;
            }
          }
        }
      
        if (this.rightPressed && this.paddle.paddleX < canvas.width - this.paddle.width) {
          this.paddle.paddleX += 7;
        } else if (this.leftPressed && this.paddle.paddleX > 0) {
          this.paddle.paddleX -= 7;
        }
      
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        requestAnimationFrame(() => {
          this.draw()
        });
    };
}

let game = new Game()

// This is waiting for some kind of user input, keydown (When clicked), keyup (when no longer clicked), mousemove "captures move movement"
document.addEventListener('keydown', game.keyDownHandler, false);
document.addEventListener('keyup', game.keyUpHandler, false);
document.addEventListener('mousemove', game.mouseMoveHandler, false);

game.draw()