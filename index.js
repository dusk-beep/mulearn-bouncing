const canvas = document.getElementById('my-canvas');
const h4 = document.getElementById('popped');
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext('2d');

const balls = [];

const cursor = {
  sx: 0,
  sy: 0,
  ex: 0,
  ey: 0,
};

let popped = 0;
const isTouchDevice = 'ontouchstart' in window; // Check if touch events are supported

// Mouse events for desktop
if (!isTouchDevice) {
  addEventListener('mousedown', event => {
    event.preventDefault();
    cursor.sx = event.clientX;
    cursor.sy = event.clientY;
  });

  addEventListener('mousemove', event => {
    cursor.ex = event.clientX;
    cursor.ey = event.clientY;
  });

  addEventListener('mouseup', () => {
    for (const key in cursor) {
      cursor[key] = -1;
    }
  });
}

// Touch events for mobile
if (isTouchDevice) {
  addEventListener('touchstart', event => {
    event.preventDefault();
    cursor.sx = event.touches[0].clientX;
    cursor.sy = event.touches[0].clientY;
  });

  addEventListener('touchmove', event => {
    event.preventDefault();
    cursor.ex = event.touches[0].clientX;
    cursor.ey = event.touches[0].clientY;
    drawLine();
  });

  addEventListener('touchend', () => {
    for (const key in cursor) {
      cursor[key] = -1;
    }
  });
}

addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(cursor.sx, cursor.sy);
  ctx.lineTo(cursor.ex, cursor.ey);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 20;
  ctx.stroke();
  cursor.sx = cursor.ex;
  cursor.sy = cursor.ey;
}

class Ball {
  constructor(x, y, radius, rgb) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;
    this.direction = random(0, 360) * (Math.PI / 180);
    this.speed = random(1, 5);
  }

  update() {
    if (this.x + this.radius >= width) {
      this.direction = Math.PI - this.direction;
      this.x = width - this.radius;
    }

    if (this.x - this.radius <= 0) {
      this.direction = Math.PI - this.direction;
      this.x = this.radius;
    }

    if (this.y + this.radius >= height) {
      this.direction = -this.direction;
      this.y = height - this.radius;
    }

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

  collision() {
    const bll = {
      posX: this.x + this.radius,
      posY: this.y + this.radius,
      negX: this.x - this.radius,
      negY: this.y - this.radius,
    };

    if (
      cursor.sx >= bll.negX &&
      cursor.ex <= bll.posX &&
      cursor.sy >= bll.negY &&
      cursor.ey <= bll.posY
    ) {
      const index = balls.indexOf(this);
      if (index !== -1) {
        balls.splice(index, 1);
        popped++;
        h4.innerText = `popped: ${popped}`;
      }

      return true;
    }

    console.log('No collision.');
    return false;
  }
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

  if (balls.length < 15) {
    getRandomBalls();
  }

  for (const ball of balls) {
    ball.draw();
    ball.animate();
    ball.collision();
  }

  requestAnimationFrame(gameLoop);
}

getRandomBalls();
gameLoop();
