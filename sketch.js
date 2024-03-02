let HEIGHT = 500;
let NUM_BALLS = 1200;
let balls = [];
let track = [];


function setup() {

  var canvas = createCanvas(windowWidth, HEIGHT);
  canvas.parent('sketch-holder');


  gui = createGui();

  bigBall = new Ball(random_position = false, radius = 30, velocity = 0, b_color = 'Crimson');
  balls.push(bigBall);
  // track.push(bigBall.position);

  for (var i = 0; i < NUM_BALLS; i++) {
    balls.push(new Ball());
  }


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
  energy = 0;
  balls.forEach(ball => {
    
    ball.draw();
    ball.update();


    energy += ball.m * ball.velocity.magSq();
  })


  fill('white');
  textSize(32);
  text('Energy = ' + 0.5 * energy.toFixed(), 10, 50);
  //  track.push(balls[0].position);

  //  stroke('green');
  //  for(var i=0; i < track.length-1; i++) {
  //    line(track[i].x,track[i].y, track[i+1].x, track[i+1].y);
  //  }
}

function windowResized() {

  resizeCanvas(windowWidth, HEIGHT);
}


