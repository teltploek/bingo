import React from 'react';

const CircusLights = () => {
  const colors = [
    '#FF5252', // Red
    '#40A2E3', // Blue
    '#FFB347', // Orange
    '#B666D2', // Purple
    '#FFD700', // Gold
    '#FF69B4', // Pink
    '#4DCAF7', // Sky Blue
    '#FF7F50', // Coral
    '#E066FF', // Violet
    '#32CD32', // Lime Green
  ];

  const numberOfLights = 20;
  const radius = 140;

  // Helper function to round numbers to fixed precision
  const round = (num: number) => Number(num.toFixed(2));

  const lights = Array.from({ length: numberOfLights }, (_, index) => {
    const angle = (index / numberOfLights) * 2 * Math.PI;
    const x = round(radius * Math.cos(angle));
    const y = round(radius * Math.sin(angle));
    const color = colors[index % colors.length];

    return (
      <g key={index} transform={`translate(${x}, ${y})`}>
        {/* Outer glow effect */}
        <circle
          r="10"
          fill={color}
          opacity="0.3"
          className="animate-pulse"
          style={{
            filter: 'url(#glow)',
            animationDuration: `${2 + (index % 2)}s`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
        {/* Inner glow */}
        <circle
          r="8"
          fill={color}
          opacity="0.5"
          className="animate-pulse"
          style={{
            filter: 'url(#glow)',
            animationDuration: `${2 + (index % 2)}s`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
        {/* Main light bulb */}
        <circle
          r="6"
          fill={color}
          className="animate-pulse"
          style={{
            animationDuration: `${2 + (index % 2)}s`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      </g>
    );
  });

  return (
    <div className="relative">
      <svg
        width="300"
        height="300"
        viewBox="-150 -150 300 300"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lights}
      </svg>

      <style jsx>{`
        @keyframes pulseOuter {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1.2);
          }
          50% {
            opacity: 0.4;
            transform: scale(1);
          }
        }

        @keyframes pulseInner {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1.1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.9);
          }
        }

        @keyframes pulseBulb {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
};

export default CircusLights;
