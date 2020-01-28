// canvas tag
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// ball radius
let ballRadius = 10;
// ball movement
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// paddle properties and movement
const paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// button variables that detect tough
let rightPressed = false;
let leftPressed = false;

// brick count, size, and location on the page
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// scores, lives, and levels
let score = 0;
let lives = 3;
let level = 0;

// this forloop builds the bricks layout
const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// function to check for right error key
const keyDownHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

// this turns off the click from the user input
const keyUpHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

// this will capture mouse movement
const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
};

// This is waiting for some kind of user input, keydown (When clicked), keyup (when no longer clicked), mousemove "captures move movement"
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

const restoreObjects = () => {
  bricks.map((row) => {
    return row.map((object) => {
      return object.status = 2
    });
  });
}

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
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

const drawBall = () => {
  const randomColors = ['red', 'blue', 'green', 'orange', 'yellow', 'lightgray', 'pink'];
  const color = randomColors[Math.floor(Math.random() * randomColors.length)];

  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};
const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
};
const drawLives = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

const drawLevel = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Level: ${level}`, (canvas.width / 2) - 25, 20);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawLevel();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (ballRadius >= 1.5) {
        ballRadius -= 1.5;
      }
      dy = -dy;
    } else {
      paddleWidth += 15;
      ballRadius += 2;
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
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

draw();


class Ball {
  constructor() {
    this.x = 0
    this.y = 0
    this.dx = 2
    this.dy = 2
  }

  move() {
    this.x += this.dx
  }

  render(ctx) {
    ctx.beginPath()
  }
}

class Game {
  constructor(levels){

    this.gameCanvas = {
      canvas: document.getElementById('myCanvas'),
      ctx: canvas.getContext('2d')
    }

    this.level = level
    this.lives = 3
    this.

    this.ball = new Ball()
    this.ball.render(this.gameCanvas.ctx)
    
    this.ball = {
      ballRadius: 10,
      x: this.gameCanvas.canvas.width / 2,
      y: this.gameCanvas.canvas.height - 30,
      dx: 2,
      dy: -2
    }

    this.paddle = {
      paddleHeight: 10,
      paddleWidth: 75,
      paddleX: (this.gameCanvas.canvas.width - paddleWidth) / 2
    }


  }

  drawGame = () =>{

  }

}