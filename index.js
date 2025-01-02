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
  }
}

function getRandomPos() {
  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);

  console.log(x, y);
  return [x, y];
}

function renderBalls(balls) {
  for (const ball of balls) {
    ctx.fillStyle = `rgb(${ball.rgb.r} ${ball.rgb.g} ${ball.rgb.b} )`;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }
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

getRandomBalls();
renderBalls(balls);
