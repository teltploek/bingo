import React from 'react';

const SideDecorations = () => {
  const colors = {
    primary: '#c41e3a',
    secondary: '#f4f0ec',
    accent: '#FFD700',
    blue: '#40A2E3',
    purple: '#B666D2',
    gold: '#DAA520',
  };

  // Function to create light bulb path
  const createLightBulb = () => {
    return `
      M0,0 
      a5,5 0 1,0 10,0 
      a5,5 0 1,0 -10,0
      M4,-5 L4,-8 
      L6,-8 L6,-5 Z
    `;
  };

  // Function to create a wavy path
  const createWavyPath = (startX: number, startY: number, amplitude: number, frequency: number) => {
    let path = `M${startX},${startY} `;
    for (let i = 0; i <= 800; i += 20) {
      const x = startX + amplitude * Math.sin((i / 100) * frequency);
      path += `L${x},${startY + i} `;
    }
    return path;
  };

  return (
    <div className="fixed inset-y-0 w-full pointer-events-none" style={{ zIndex: 0 }}>
      {/* Left Side Decoration */}
      <div className="absolute left-0 inset-y-0">
        <svg width="200" height="100%" viewBox="0 0 200 800" preserveAspectRatio="none">
          <defs>
            {/* Soft glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Single strand */}
          <g>
            {/* Light string */}
            <path
              d={createWavyPath(60, 0, 20, 1)}
              fill="none"
              stroke={colors.secondary}
              strokeWidth="1"
              opacity="0.2"
            />

            {/* Light bulbs */}
            {Array.from({ length: 20 }, (_, i) => (
              <g
                key={`bulb-left-${i}`}
                transform={`translate(
                  ${60 + 20 * Math.sin((i * 40) / 100)},
                  ${i * 40}
                )`}
              >
                <g filter="url(#glow)">
                  <path
                    d={createLightBulb()}
                    fill={
                      [colors.primary, colors.blue, colors.accent, colors.purple, colors.gold][
                        i % 5
                      ]
                    }
                    className="animate-pulse"
                    style={{
                      animationDuration: `${2 + Math.random()}s`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                </g>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Right Side Decoration - Mirrored */}
      <div className="absolute right-0 inset-y-0">
        <svg width="200" height="100%" viewBox="0 0 200 800" preserveAspectRatio="none">
          {/* Single strand */}
          <g>
            {/* Light string */}
            <path
              d={createWavyPath(140, 0, -20, 1)}
              fill="none"
              stroke={colors.secondary}
              strokeWidth="1"
              opacity="0.2"
            />

            {/* Light bulbs */}
            {Array.from({ length: 20 }, (_, i) => (
              <g
                key={`bulb-right-${i}`}
                transform={`translate(
                  ${140 - 20 * Math.sin((i * 40) / 100)},
                  ${i * 40}
                )`}
              >
                <g filter="url(#glow)">
                  <path
                    d={createLightBulb()}
                    fill={
                      [colors.primary, colors.blue, colors.accent, colors.purple, colors.gold][
                        i % 5
                      ]
                    }
                    className="animate-pulse"
                    style={{
                      animationDuration: `${2 + Math.random()}s`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                </g>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SideDecorations;
