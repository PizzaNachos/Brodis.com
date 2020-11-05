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
          width: 1,
        },
        move: {
          enable: true,
          speed: .8,
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