const canvas = document.getElementById('my-canvas');
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext('2d');

const balls = [];

class Ball {
  constructor(x, y, radius, rgb) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;
    this.direction = random(0, 360) * (Math.PI / 180);
    this.speed = random(1, 5);
  }

  // the point of contact move the ball to the direction of the semi
  // circle that is poibtibg to valid how
  // update() {
  //   if (this.x + this.radius >= width) {
  //     this.direction = random(90, 270) * (Math.PI / 180);
  //   }
  //   if (this.y + this.radius >= height) {
  //     this.direction = random(180, 360) * (Math.PI / 180);
  //   }
  //   if (this.x - this.radius <= 0) {
  //     this.direction = random(90, 270) * (Math.PI / 180);
  //   }
  //   if (this.y - this.radius <= 0) {
  //     this.direction = random(0, 180) * (Math.PI / 180);
  //   }
  // }

  update() {
    // Right boundary
    if (this.x + this.radius >= width) {
      this.direction = Math.PI - this.direction;
      this.x = width - this.radius;
    }

    // Left boundary
    if (this.x - this.radius <= 0) {
      this.direction = Math.PI - this.direction;
      this.x = this.radius;
    }

    // Bottom boundary
    if (this.y + this.radius >= height) {
      this.direction = -this.direction;
      this.y = height - this.radius;
    }

    // Top boundary
    if (this.y - this.radius <= 0) {
      this.direction = -this.direction;
      this.y = this.radius;
    }
  }

  draw() {
    ctx.fillStyle = `rgb(${this.rgb.r} ${this.rgb.g} ${this.rgb.b} )`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  animate() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;
    this.update();
  }

  collission() {}
}

function random(low, upper) {
  return Math.floor(Math.random() * (upper - low + 1) + low);
}

function getRandomPos() {
  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);

  console.log(x, y);
  return [x, y];
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256); // Red
  const g = Math.floor(Math.random() * 256); // Green
  const b = Math.floor(Math.random() * 256); // Blue

  return { r, g, b };
}

function getRandomBalls() {
  while (balls.length < 20) {
    const [x, y] = getRandomPos();
    const radius = Math.floor(Math.random() * (40 - 20 + 1) + 20);
    const rgb = getRandomRGB();
    const ball = new Ball(x, y, radius, rgb);
    balls.push(ball);
  }
}

function gameLoop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.animate();
  }

  requestAnimationFrame(gameLoop);
}

getRandomBalls();
gameLoop();
