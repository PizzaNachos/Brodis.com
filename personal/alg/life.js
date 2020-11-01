var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(223,223,223)";
var sizeButton = document.getElementById("sizeSlider");

let animating = false;
var animationSetIntervalID;
let animationSpeed = 75;

let randomProbability = 1.4;
let pixel_size = 5;

let pixels_wide = canvas.width / pixel_size;
let pixels_high = canvas.height / pixel_size;
let pixels = [];
let next_generation = [];

pixels.length = (canvas.width / pixel_size) * (canvas.height / pixel_size);
next_generation.length = pixels.length;
randomizePixels();
console.log(pixels);

function changeSize(size) {
  pixel_size = size;
  updatePixelSize();
}

function animateLife() {
  //var myDaemon = new MiniDaemon( Window, life(), 25, 1000)
  
  if (animating == false) {
    animationSetIntervalID = setInterval(() => {
      life();
    }, animationSpeed);
    animating = true;
  } else {
    clearInterval(animationSetIntervalID);
    animating = false;
  }
}

function updatePixelSize() {
  pixels_wide = canvas.width / pixel_size;
  pixels_high = canvas.height / pixel_size;
  pixels.length = Math.round(
    (canvas.width / pixel_size) * (canvas.height / pixel_size)
  );
  next_generation.length = pixels.length;
  //console.log(pixels_wide, pixels.length);
  drawBoard();
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(30,200,45)";
  for (let i = 0; i < canvas.height; i++) {
    for (let j = 0; j < canvas.width; j++) {
      if (pixels[i * pixels_wide + j] == true) {
        ctx.fillRect(j * pixel_size, i * pixel_size, pixel_size, pixel_size);
      }
      //ctx.fillStyle = "rgb(" + i + ", " + j + "," + (i - j) + ")";
    }
  }
}
function clearPixels() {
  for (let index = 0; index < pixels.length; index++) {
    pixels[index] = 0;
  }
  drawBoard();
}

function randomizePixels() {
  for (let index = 0; index < pixels.length; index++) {
    pixels[index] = Math.round(Math.random() / randomProbability);
  }
  console.log(pixels);

  drawBoard();
}

function life() {
  //console.log(pixels);
  for (let i = 0; i < pixels_high; i++) {
    for (let j = 0; j < pixels_wide; j++) {
      let thisPixel = i * pixels_wide + j;
      let thisPixelNeighbors = hasLivingNeighbors(thisPixel);
      if (thisPixelNeighbors == 3) {
        next_generation[thisPixel] = 1;
      } else if (thisPixelNeighbors > 3) {
        next_generation[thisPixel] = 0;
      } else if (thisPixelNeighbors < 2) {
        next_generation[thisPixel] = 0;
      } else {
        next_generation[thisPixel] = pixels[thisPixel];
      }
    }
  }
  //console.log(pixels);
  pixels = next_generation.slice();
  drawBoard();
}

function hasLivingNeighbors(pixelNumber) {
  let living = 0;
  if (pixelNumber + 1 < pixels.length && pixels[pixelNumber + 1]) {
    living++;
  }
  if (pixelNumber - 1 > 0 && pixels[pixelNumber - 1]) {
    living++;
  }
  if (
    pixelNumber + pixels_wide + 1 < pixels.length &&
    pixels[pixelNumber + pixels_wide + 1]
  ) {
    living++;
  }
  if (
    pixelNumber + pixels_wide < pixels.length &&
    pixels[pixelNumber + pixels_wide]
  ) {
    living++;
  }
  if (
    pixelNumber + pixels_wide - 1 < pixels.length &&
    pixels[pixelNumber + pixels_wide - 1]
  ) {
    living++;
  }

  if (
    pixelNumber - pixels_wide + 1 > 0 &&
    pixels[pixelNumber - pixels_wide + 1]
  ) {
    living++;
  }
  if (pixelNumber - pixels_wide > 0 && pixels[pixelNumber - pixels_wide]) {
    living++;
  }
  if (
    pixelNumber - pixels_wide - 1 > 0 &&
    pixels[pixelNumber - pixels_wide - 1]
  ) {
    living++;
  }
  return living;
}

window.onload = function() {
  tsParticles.loadJSON('particles-js', 'assets/particles.json').then(function(p) {
    // p is the loaded container, for using it later
    console.log('callback - particles.js config loaded');
  });
  tsParticles.load("tsparticles", {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["rgba(0,0,0,)"]
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#b6b2b2"
        }
      },
      size: {
        value: 2,
        random: false,
      },
      lineLinked: {
        enable: true,
        distance: 130,
        color: "rgb(0,0,0)",
        opacity: 1,
        width: 2,
      },
      move: {
        enable: true,
        speed: .64,
        direction: "none",
        random: true,
        straight: false,
        outMode: "bounce",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
  });
};
