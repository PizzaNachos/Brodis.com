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
  
// function square(){
//   let diffx = rightx - leftx;
//   let diffy = bottomy-topy;
//   if(diffx < diffy){
//     topy = leftx
//     bottomy = rightx
//   } else {
//     rightx = topy
//     leftx = bottomy
//   }
//   doStuff()
// }
canvas.onwheel = zoom;
function zoom(event) {
  event.preventDefault();
  let ammount = event.deltaY * .1;
  leftx += ammount;
  rightx += -ammount;
  topy += -ammount;
  bottomy += ammount;
  doStuff();
}
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  var relativeY = e.clientY - canvas.offsetTop;
  if(relativeX > 0 && relativeX < canvas.width) {
    mouseX = relativeX;
    mouseY = relativeY;
  }
}

doStuff();


//This function is painfully slow, sometimes taking over a second to compute and draw to the screen
//Not sure if the computing or the drawing is slower
//The drawing takes the most time, the render time is halved by not drawing black squares.
//Cutting #of iteration by 1/5 took 400-500ms off render time, (from ~1200 to ~800(~900?))
//but filling the screen with drawn pixels increases the render time to 
//Not changing color nearly halves render time(91 ms fastest, 1000 slowest)
// |Iterations| Color change? | Time |
// |51        | [ ]           | 600  | Looks horrific
// |51        | [X]           | 1500 | Looks Weird
// |255       | [X]           | 1800 | Looks Good
// |255       | [ ]           | 1000 | Looks very bad

//The drawing takes more time than the iterations -> 300 ms difference vs 1000ms difference.

function doStuff() {
  let t0 = performance.now();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let px;
  let py;
  for (let i = 0; i < canvas.height; i++) {
    py = translate(i, 0, canvas.height, bottomy, topy);
    for (let j = 0; j < canvas.width; j++) {
      px = translate(j, 0, canvas.width, leftx, rightx);
      let test = testNum(px, py, 255);
      if(test != 255 && ((test%200)-10)*2 >= 5){
        ctx.fillStyle = "rgb(" + ((test%200)-10)*2 + "," + ((test%200)-10)*2 + "," + ((test%200)-10)*2 +")";
        ctx.fillRect(j, i, 1, 1);
      }
    }
  }
  let t1 = performance.now();
  console.log("MS to render: " + (t1-t0));
  console.log("Left X: " + leftx + " Right X: " + rightx + " Top Y: " + topy +" Bottom Y: " + bottomy);
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
