window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const enemyHelth = document.querySelector(".score_enemy_helth > figure");
  const degHelth = document.querySelectorAll(".score_deg_helth > svg");
  const score = document.querySelector(".score_counter");

  const start = document.querySelector(".start");

  const over = document.querySelector(".over");

  const toggleStart = document.querySelector(".start > button");
  const toggleReStart = document.querySelector(".over > button");

  canvas.width = 600;
  canvas.height = 1200;

  const background = new Image();

  background.src =
    "https://i.pinimg.com/originals/39/e6/98/39e69840a1f7b3f451d23879cc72454c.jpg";

  start.style.display = "flex";
  toggleStart.addEventListener("click", () => {
    gameOver();
    start.style.display = "none";
  });

  toggleReStart.addEventListener("click", () => {
    gameOver();
    over.style.display = "none";
  });

  const gravity = 0.5;

  const keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
    down: {
      pressed: false,
    },
  };

  class Bg {
    constructor() {}

    draw() {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

    update() {
      this.draw();
    }
  }

  const bg = new Bg();

  class Degget {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;

      this.width = 50;
      this.height = 50;

      this.score = 0;

      this.lives = 5;

      this.marked = false;
    }

    draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

      score.textContent = this.score;
    }

    collision() {
      console.log("eeee");
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  const deg = new Degget({
    position: {
      x: canvas.width / 2 - 25,
      y: canvas.height - 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

  class Enemy {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;

      this.width = 50;
      this.height = 50;

      this.helth = 100;
    }

    draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      enemyHelth.style.width = `${this.helth}%`;
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  const enemies = [];

  class Ammo {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;

      this.radius = 10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  const ammoItems = [];

  const random = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  setInterval(() => {
    enemies.forEach((e) => {
      e.velocity.y = random(-2, 2);
    });
  }, 1000);

  setInterval(() => {
    enemies.forEach((e) => {
      e.velocity.x = random(-7, 7);
    });
  }, 1000);

  const animate = () => {
    const game = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.update();
    deg.update();

    ammoItems.forEach((item, idx) => {
      if (item.position.y + item.radius <= 0) {
        setTimeout(() => {
          ammoItems.splice(idx, 1);
        }, 0);
      } else {
        item.update();
      }
    });

    deg.velocity.x = 0;
    deg.velocity.y = 0;

    if (enemies.length <= 0) {
      enemies.push(
        new Enemy({
          position: {
            x: Math.floor(Math.random() * canvas.width),
            y: canvas.height / 2,
          },
          velocity: {
            x: 2,
            y: 1,
          },
        })
      );
    }

    enemies.forEach((e, idx) => {
      if (e.position.x + e.width + e.velocity.x <= 0 + e.width) {
        e.velocity.x = 0;
      }

      if (e.position.x + e.width + e.velocity.x >= canvas.width) {
        e.velocity.x = 0;
      }

      if (e.position.y + e.height + e.velocity.y < 50) {
        e.velocity.y = 0;
      }

      if (e.position.y + e.height + e.velocity.y >= canvas.height) {
        cancelAnimationFrame(game);
        over.style.display = "flex";
      }

      if (
        e.position.x < deg.position.x + deg.width &&
        e.position.x + e.width > deg.position.x &&
        e.position.y < deg.position.y + deg.height &&
        e.position.y + e.height > deg.position.y
      ) {
        cancelAnimationFrame(game);
        e.position.y = 0;
        (deg.position.y = canvas.height - 100),
          setTimeout(() => {
            requestAnimationFrame(animate);
            deg.lives -= 1;

            degHelth[deg.lives].style.fill = "none";
          }, 0);
      }

      ammoItems.forEach((ammo, aIdx) => {
        if (
          ammo.position.x < e.position.x + e.width &&
          ammo.position.x + ammo.radius > e.position.x &&
          ammo.position.y < e.position.y + e.height &&
          ammo.position.y + ammo.radius > e.position.y
        ) {
          setTimeout(() => {
            e.helth -= 10;
            deg.score += 1;

            if (e.helth == 0) {
              enemies.splice(idx, 1);
              e.helth = 100;
            }

            ammoItems.splice(aIdx, 1);
          }, 0);
        }
      });

      if (deg.lives <= 0) {
        cancelAnimationFrame(game);

        over.style.display = "flex";
      }

      e.update();
    });

    if (keys.left.pressed) {
      deg.velocity.x = -5;
    } else if (keys.right.pressed) {
      deg.velocity.x = 5;
    } else if (keys.up.pressed) {
      deg.velocity.y = -5;
    } else if (keys.down.pressed) {
      deg.velocity.y = 5;
    }

    if (deg.position.x + deg.width + deg.velocity.x < 0 + deg.width) {
      deg.velocity.x = 0;
    }

    if (deg.position.x + deg.width + deg.velocity.x > canvas.width) {
      deg.velocity.x = 0;
    }

    if (deg.position.y + deg.height + deg.velocity.y > canvas.height) {
      deg.velocity.y = 0;
    }

    if (deg.position.y + deg.height + deg.velocity.y < 50) {
      deg.velocity.y = 0;
    }
  };

  const gameOver = () => {
    deg.lives = 5;

    deg.score = 0;

    enemies.forEach((e) => {
      e.helth = 100;

      e.position.y = 0;
      deg.position.y = canvas.height - 100;
    });

    degHelth.forEach((e) => {
      e.style.fill = "#ff004c";
    });

    animate();
  };

  addEventListener("keydown", (e) => {
    switch (e.key) {
      case "a":
        keys.left.pressed = true;
        break;

      case "d":
        keys.right.pressed = true;
        break;

      case "w":
        keys.up.pressed = true;
        break;

      case "s":
        keys.down.pressed = true;
        break;

      case " ":
        ammoItems.push(
          new Ammo({
            position: {
              x: deg.position.x + deg.width / 2,
              y: deg.position.y,
            },
            velocity: {
              x: 0,
              y: -10,
            },
          })
        );

        break;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.key) {
      case "a":
        keys.left.pressed = false;
        break;

      case "d":
        keys.right.pressed = false;
        break;

      case "w":
        keys.up.pressed = false;
        break;

      case "s":
        keys.down.pressed = false;
        break;
    }
  });
});
