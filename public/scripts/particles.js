window.onload = function () {
  Particles.init({
    // normal options
    selector: ".background",
    maxParticles: 120,
    connectParticles: true,
    color: "#f1f1f1",
    // options for breakpoints
    responsive: [
      {
        breakpoint: 1500,
        options: {
          maxParticles: 55,
          color: "#f1f1f1",
          connectParticles: true,
        },
      },
      {
        breakpoint: 900,
        options: {
          maxParticles: 35,
          color: "#f1f1f1",
          connectParticles: true,
        },
      },
      {
        breakpoint: 425,
        options: {
          maxParticles: 35,
          connectParticles: false,
        },
      },
      {
        breakpoint: 320,
        options: {
          maxParticles: 0,

          // disables particles.js
        },
      },
    ],
  });
};
