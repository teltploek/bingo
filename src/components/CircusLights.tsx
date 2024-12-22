import React from 'react';

const CircusLights = () => {
  // Array of festive colors
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

  // Create lights positioned in a circle
  const numberOfLights = 20; // Increased number of lights
  const radius = 140; // Adjusted to fit around the logo
  const lights = Array.from({ length: numberOfLights }, (_, index) => {
    const angle = (index / numberOfLights) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
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
            animation: `pulseOuter ${2 + index * 0.1}s infinite`,
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
            animation: `pulseInner ${2 + index * 0.1}s infinite`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
        {/* Main light bulb */}
        <circle
          r="6"
          fill={color}
          className="animate-pulse"
          style={{
            animation: `pulseBulb ${2 + index * 0.1}s infinite`,
            animationDelay: `${index * 0.1}s`,
            transformOrigin: 'center',
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
