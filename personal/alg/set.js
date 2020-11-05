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
          value: ["rgb(0,0,0)"]
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

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(200,200,200)";

function doStuff(){
    for(let i = 0; i < canvas.height; i++){
        for (let j = 0; j < canvas.width; j++) {
            
            
        }
    }
}
//translate(i, -1, 1, 0,1000)
function translate(val,firstBound,secondBound,outputFirst,outputSecond){
    let inputRange = secondBound - firstBound;
    let outputRange = outputSecond - outputFirst;
    let offset = firstBound - outputFirst;
}
let x = [];
let y = [];
for(let i = -100; i < 100; i++){
    x.push(i);
    y.push(translate(i,-100.0,100.0,-3.0,3.0));
}
console.log(x);
console.log(y);