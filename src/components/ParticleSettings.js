import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleSettings = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init && (
        <Particles
          height="1000px"
          width="100vw"
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "rgb(0, 0, 0)"
              }
            },
            fpslimit: 60,
            interactivity: {
              detect_on: "canvas",
              events: {
                onClick: {
                  enable: "true",
                  mode: "push"
                },
                onHover: {
                  enable: "true",
                  mode: "repulse"
                },
                resize: "true"
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40
                },
                push: {
                  quantity: 4
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: "#ffffff"
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
              },
              collisions: {
                enable: true
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 3,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800
                },
                value: 80
              },
              opacity: {
                value: 0.5
              },
              shape: {
                type: "circle"
              },
              size: {
                random: true,
                value: 5
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default ParticleSettings;
