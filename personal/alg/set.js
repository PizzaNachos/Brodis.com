window.onload = function () {
  tsParticles
    .loadJSON("particles-js", "assets/particles.json")
    .then(function (p) {
      // p is the loaded container, for using it later
      console.log("callback - particles.js config loaded");
    });
  tsParticles.load("tsparticles", {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ["rgb(0,0,0)"],
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#b6b2b2",
        },
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
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.64,
        direction: "none",
        random: true,
        straight: false,
        outMode: "bounce",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
  });
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(200,200,200)";

let leftx = -1.5;
let rightx = 0.5;
let topy = 1;
let bottomy = -1;

leftxSlider = document.getElementById("leftx");
rightxSlider = document.getElementById("rightx");
topySlider = document.getElementById("topy");
bottomySlider = document.getElementById("bottomy");

let mouseX;
let mouseY;

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  var relativeY = e.clientY - canvas.offsetTop;
  if(relativeX > 0 && relativeX < canvas.width) {
    mouseX = relativeX;
    mouseY = relativeY;
  }
}


leftxSlider.addEventListener("change", () => {
    leftx = leftxSlider.valueAsNumber;
    doStuff();
});
rightxSlider.addEventListener("change", () => {
  rightx = rightxSlider.valueAsNumber;
  doStuff();
});
topySlider.addEventListener("change", () => {
  topy = topySlider.valueAsNumber;
  doStuff();
});
bottomySlider.addEventListener("change", () => {
  bottomy = bottomySlider.valueAsNumber;
  doStuff();
});
  
doStuff();

function doStuff() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let px;
  let py;
  for (let i = 0; i < canvas.height; i++) {
    py = translate(i, 0, canvas.height, bottomy, topy);
    for (let j = 0; j < canvas.width; j++) {
      px = translate(j, 0, canvas.width, leftx, rightx);
      let test = testNum(px, py, 255);
      if(test != 255){
        ctx.fillStyle = "rgb(" + (test%125)*2 + "," + (test%125)*2 + "," + (test%125)*2 +")";
        ctx.fillRect(j, i, 1, 1);
      } 
    }
  }
}
function testNum(real, imaginary, time) {
  let previousReal = real;
  let previousImaginary = imaginary;
  let currentReal = 0;
  let currentImaginary = 0;

  for (let i = 0; i < time; i++) {
    currentReal =
      previousReal * previousReal -
      previousImaginary * previousImaginary +
      real;
    currentImaginary = 2 * previousReal * previousImaginary + imaginary;

    previousReal = currentReal;
    previousImaginary = currentImaginary;

    if (currentReal + currentImaginary > 4) {
      return i;
    }
  }
  return time;
}
function translate(val, firstBound, secondBound, outputFirst, outputSecond) {
  let normalVal = val - firstBound;
  let inputRange = secondBound - firstBound;
  let percentInput = normalVal / inputRange;
  let outputRange = outputSecond - outputFirst;
  return percentInput * outputRange + outputFirst;
}
