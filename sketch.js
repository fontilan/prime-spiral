let x, y;
let step = 1;
let stepSize;
let numSteps = 1;
let state = 0;
let turnCounter = 1;
let totalSteps;
let size;

// this function checks whether or not a given number is a prime number - it can most likely be optimized for faster finding
function checkPrime(number) {
  if (number === 1) return false;
  let isPrime = true;
  for (let i = 2; i <= sqrt(number); i++) {
    if (number % i == 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime;
}

function setup() {
  size = min(0.95 * windowWidth, 0.95 * windowHeight);
  createCanvas(size, size);
  background(250);
  stepSize = width / 80;
  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  const columns = width / stepSize;
  const rows = height / stepSize;
  totalSteps = (columns - 1) * (rows - 1);
}

function draw() {
  //frameRate(120);
  fill("#94bbe9");
  stroke("#94bbe9");
  strokeWeight(stepSize / 8);

  // textAlign(CENTER, CENTER);
  // textSize(stepSize / 2);

  line(x, y, px, py);
  px = x;
  py = y;

  //we only draw the circle if the number (step) is prime
  if (checkPrime(step)) {
    circle(x, y, stepSize * 0.8);
  }

  // this allows for changing of the direction, the rotation of the spiral
  switch (state) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }

  //check if we need to change the state (change direction)
  if (step % numSteps === 0) {
    // if yes - turn
    state = (state + 1) % 4;
    turnCounter++;
    // every two turns increase the number of steps
    if (turnCounter % 2 === 0) {
      numSteps++;
    }
  }

  step++;

  // we stop the rendering when we traverse all of the canvas
  if (step > totalSteps) {
    noLoop();
  }
}
