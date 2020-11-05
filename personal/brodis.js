let lineColor = "#4985e2";
let circleColor = "rgba(255,255,255,0)";

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
        value: [circleColor],
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 0,
        random: false,
      },
      lineLinked: {
        enable: true,
        distance: 130,
        color: lineColor,
        opacity: 1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.3,
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

const checkpoint = 800;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    opacity = currentScroll / checkpoint;
  } else {
    opacity = 100;
  }
  document.querySelector(".nav_bar").style.opacity = opacity;
});

let lightmode = false;
function toggleLightMode() {
  if (lightmode == false) {
    circleColor = "rgb(25,25,25)";
    lineColor = "rgb(255,0,0)";
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
          value: [circleColor],
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 3,
          random: true,
        },
        lineLinked: {
          enable: true,
          distance: 130,
          color: lineColor,
          opacity: 1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.3,
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
    document.documentElement.style.cssText =
      "--main-bg-color: rgb(235, 235, 235);" +
      "--text-color: black; --main-light-grey: rgb(150, 150, 150);" +
      "--main-dark-grey: rgb(230, 230, 230); --project-background: rgba(0,0,0,.87);--toggle-color: rgb(200, 50, 50);";
    document.getElementById("toggleButton").innerHTML = "Toggle Dark Mode";
    lightmode = true;
  } else {
    lineColor = "#4985e2";
    circleColor = "rgba(200,200,200)";
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
          value: [circleColor],
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 0,
          random: false,
        },
        lineLinked: {
          enable: true,
          distance: 130,
          color: lineColor,
          opacity: 1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.3,
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
    document.documentElement.style.cssText =
      "--main-bg-color: rgb(15,15,15); --main-light-grey: rgb(30, 30, 30);" +
      "--main-dark-grey: rgb(25, 25, 25);--main-light: rgb(223, 223, 223);" +
      "--shadow-color: rgb(0, 0, 0); --text-color: white; --project-background: rgba(30,30,30,.85);--toggle-color: rgb(73, 133, 226);";
    document.getElementById("toggleButton").innerHTML = "Toggle Light Mode";
    lightmode = false;
  }
}
