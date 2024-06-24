let HEIGHT = 500;
let NUM_BALLS = 1200;
let balls = [];
let track = [];
let max_velocity;


function setup() {

  var canvas = createCanvas(windowWidth, HEIGHT);
  canvas.parent('sketch-holder');


  gui = createGui();

  bigBall = new Ball(random_position = false, radius = 30, velocity = 0);
  balls.push(bigBall);

  for (var i = 0; i < NUM_BALLS; i++) {
    balls.push(new Ball());
  }

  max_velocity = Math.max(...balls.map(obj => obj.velocity.magSq()));
}

function draw() {

  var canvas = createCanvas(windowWidth, HEIGHT);
  canvas.parent('sketch-holder');
  background(30);

  for (var i = 0; i < balls.length; i++) {
    for (var j = i + 1; j < balls.length; j++) {
      balls[i].checkCollision(j);
    }
  }
  max_velocity = Math.max(...balls.map(obj => obj.velocity.mag()));
  energy = 0;
  balls.forEach(ball => {

    ball.draw();
    ball.update();


    energy += ball.m * ball.velocity.magSq();
  })

  fill('white');
  stroke('white');
  textSize(32);
  text('Total energy = ' + 0.5 * energy.toFixed() + '\n' +
    'Big mass vel. = ' + balls[0].velocity.mag().toFixed(3) + '\n' +
    'Max. velocity = ' + sqrt(max_velocity).toFixed(3), 10, 50);

}

function windowResized() {

  resizeCanvas(windowWidth, HEIGHT);
}


