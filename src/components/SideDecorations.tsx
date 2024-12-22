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

  const createLightBulb = () => {
    return 'M0,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M5,-5 L5,-8';
  };

  const createWavyPath = (isRight: boolean) => {
    const startX = isRight ? 140 : 60;
    const amplitude = 20;
    let path = `M${startX},0 `;

    for (let y = 0; y <= 800; y += 40) {
      const x = startX + amplitude * Math.sin(y / 200) * (isRight ? -1 : 1);
      path += `L${x},${y} `;
    }

    return path;
  };

  // Fixed animation durations for each position
  const getAnimationDuration = (index: number) => {
    // Alternate between 2s and 3s
    return 2 + (index % 2);
  };

  // Fixed animation delays
  const getAnimationDelay = (index: number) => {
    // Space out delays by 0.2s
    return index * 0.2;
  };

  return (
    <div className="fixed inset-y-0 w-full pointer-events-none" style={{ zIndex: 0 }}>
      {/* Left Side */}
      <div className="absolute left-0 inset-y-0">
        <svg width="200" height="100%" viewBox="0 0 200 800" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={createWavyPath(false)}
            fill="none"
            stroke={colors.secondary}
            strokeWidth="1"
            opacity="0.2"
          />

          {Array.from({ length: 20 }, (_, i) => (
            <g
              key={`bulb-left-${i}`}
              transform={`translate(${60 + 20 * Math.sin((i * 40) / 200)}, ${i * 40})`}
            >
              <g filter="url(#glow)">
                <path
                  d={createLightBulb()}
                  fill={
                    [colors.primary, colors.blue, colors.accent, colors.purple, colors.gold][i % 5]
                  }
                  className="animate-pulse"
                  style={{
                    animationDuration: `${getAnimationDuration(i)}s`,
                    animationDelay: `${getAnimationDelay(i)}s`,
                  }}
                />
              </g>
            </g>
          ))}
        </svg>
      </div>

      {/* Right Side - Mirrored */}
      <div className="absolute right-0 inset-y-0">
        <svg width="200" height="100%" viewBox="0 0 200 800" preserveAspectRatio="none">
          <path
            d={createWavyPath(true)}
            fill="none"
            stroke={colors.secondary}
            strokeWidth="1"
            opacity="0.2"
          />

          {Array.from({ length: 20 }, (_, i) => (
            <g
              key={`bulb-right-${i}`}
              transform={`translate(${140 - 20 * Math.sin((i * 40) / 200)}, ${i * 40})`}
            >
              <g filter="url(#glow)">
                <path
                  d={createLightBulb()}
                  fill={
                    [colors.primary, colors.blue, colors.accent, colors.purple, colors.gold][i % 5]
                  }
                  className="animate-pulse"
                  style={{
                    animationDuration: `${getAnimationDuration(i)}s`,
                    animationDelay: `${getAnimationDelay(i)}s`,
                  }}
                />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SideDecorations;
