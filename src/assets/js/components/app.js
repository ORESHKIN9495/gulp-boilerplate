const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 1000;

const gravity = 0.5;

class Deg {
  constructor() {
    this.position = {
      x: 50,
      y: 600,
    };

    this.velocity = {
      x: 0,
      y: 1,
    };

    this.width = 30;
    this.height = 30;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };

    this.width = 100;
    this.height = 10;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const deg = new Deg();

const platform = new Platform({ x: -100, y: 800 });

const arr = [];

const keys = {
  right: {
    pressed: false,
  },

  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

let platformOffset = 3;

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  deg.update();

  platform.draw();

  if (platform.position.x < canvas.width + platform.width) {
    platform.position.x += platformOffset;
  } else {
    platform.position.x = -100;
  }

  if (keys.right.pressed) {
    deg.velocity.x = 5;
  } else if (keys.left.pressed) {
    deg.velocity.x = -5;
  } else {
    deg.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5;
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
    }
  }

  if (
    deg.position.y + deg.height <= platform.position.y &&
    deg.position.y + deg.height + deg.velocity.y >= platform.position.y &&
    deg.position.x + deg.width >= platform.position.x &&
    deg.position.x <= platform.position.x + platform.width
  ) {
    deg.velocity.y = -20;
  }

  if (scrollOffset > 600) {
    console.log("YOUR WIN");
  }

  if (deg.position.y > canvas.height) {
    location.reload();
  }
};

animate();

addEventListener("keydown", (e) => {
  if (e.code === "KeyD") {
    keys.right.pressed = true;
  } else if (e.code === "KeyA") {
    keys.left.pressed = true;
  }
});

addEventListener("keyup", (e) => {
  if (e.code === "KeyD") {
    keys.right.pressed = false;
  } else if (e.code === "KeyA") {
    keys.left.pressed = false;
  }
});

// platforms.forEach((platform) => {
//   platform.draw();

//   if (platform.position.x < canvas.width + platform.width) {
//     platform.position.x += platformOffset;
//   } else {
//     platform.position.x = -100;
//   }
// });

// if (platform.position.x < canvas.width - platform.height) {
//   platform.position.x += platformOffset;
// } else {
//   platform.position.x = -100;
// }

// if (platform.position.x > canvas.width - 200) {
//   platforms.push(
//     new Platform({
//       x: Math.floor(Math.random() + platform.position.x) + 200,
//       y: platform.position.y - 100,
//     })
//   );

//   platforms.slice(platforms.length - 1);
// }
