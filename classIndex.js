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
      const color = this.color
  
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }

    move = () => {

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