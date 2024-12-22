'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeSelector } from './ThemeSelector';
import { themes } from '@/lib/themes';
import dynamic from 'next/dynamic';
import { MediaConfig, mediaMapping } from '@/lib/mediaConfig';
import { Canvas } from '@react-three/fiber';
import NumberBall from './NumberSphere';
import TVScreen from './TVScreen';

const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false });

// NUMBER_COLORS object remains unchanged
export const NUMBER_COLORS = {
  '1-9': {
    ball: '#FF5252', // Bright Red
    grid: {
      from: '#660000', // Very Dark Red
      to: '#330000',
    },
  },
  '10-19': {
    ball: '#40A2E3', // Bright Blue
    grid: {
      from: '#001B44', // Very Dark Blue
      to: '#000B24',
    },
  },
  '20-29': {
    ball: '#FFB347', // Bright Orange
    grid: {
      from: '#662200', // Very Dark Orange
      to: '#331100',
    },
  },
  '30-39': {
    ball: '#B666D2', // Bright Purple
    grid: {
      from: '#33004D', // Very Dark Purple
      to: '#1A0027',
    },
  },
  '40-49': {
    ball: '#FFD700', // Gold
    grid: {
      from: '#664400', // Very Dark Gold
      to: '#332200',
    },
  },
  '50-59': {
    ball: '#FF69B4', // Hot Pink
    grid: {
      from: '#660033', // Very Dark Pink
      to: '#330019',
    },
  },
  '60-69': {
    ball: '#4DCAF7', // Sky Blue
    grid: {
      from: '#003366', // Very Dark Sky Blue
      to: '#001933',
    },
  },
  '70-79': {
    ball: '#FF7F50', // Coral
    grid: {
      from: '#662200', // Very Dark Coral
      to: '#331100',
    },
  },
  '80-89': {
    ball: '#E066FF', // Bright Violet
    grid: {
      from: '#440066', // Very Dark Violet
      to: '#220033',
    },
  },
  '90': {
    ball: '#FF3333', // Pure Red
    grid: {
      from: '#660000', // Very Dark Red
      to: '#330000',
    },
  },
};

const getColorForNumber = (num: number): string => {
  if (num === 90) return NUMBER_COLORS['90'].ball;
  const rangeIndex = Math.floor((num - 1) / 10);
  const ranges = Object.keys(NUMBER_COLORS);
  return NUMBER_COLORS[ranges[rangeIndex] as keyof typeof NUMBER_COLORS].ball;
};

const getGridGradientForNumber = (num: number): { from: string; to: string } => {
  if (num === 90) return NUMBER_COLORS['90'].grid;
  const rangeIndex = Math.floor((num - 1) / 10);
  const ranges = Object.keys(NUMBER_COLORS);
  return NUMBER_COLORS[ranges[rangeIndex] as keyof typeof NUMBER_COLORS].grid;
};

const BingoGame = () => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('christmas');
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<null | MediaConfig>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  // Derive available numbers from drawn numbers
  const availableNumbers = useMemo(() => {
    const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
    return allNumbers.filter((num) => !drawnNumbers.includes(num));
  }, [drawnNumbers]);

  const activeTheme = themes.find((theme) => theme.id === currentTheme)?.styles || themes[0].styles;

  useEffect(() => {
    const color = currentTheme === 'christmas' ? '#022b14' : 'white';
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [currentTheme]);

  const initializeGame = useCallback(() => {
    console.log('Initializing new game');
    setDrawnNumbers([]);
    setCurrentNumber(null);
    setIsDrawing(false);
    setShowMediaOverlay(false);
    setCurrentMedia(null);
  }, []);

  const drawNumber = useCallback(() => {
    // Check if we can draw
    if (availableNumbers.length === 0) {
      console.log('No available numbers to draw');
      return;
    }

    if (showMediaOverlay) {
      console.log('Media overlay is showing, cannot draw');
      return;
    }

    if (currentMedia) {
      console.log('Current media exists, cannot draw');
      return;
    }

    // Draw the number
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    // const drawn = availableNumbers[randomIndex];
    const drawn = 14;
    const mediaForNumber = mediaMapping[drawn];

    console.log(`Drawing number ${drawn}. Available numbers: ${availableNumbers.length}`);

    if (mediaForNumber) {
      setCurrentNumber(drawn);
      setCurrentMedia(mediaForNumber);
      setShowMediaOverlay(true);
    }
  }, [availableNumbers, showMediaOverlay, currentMedia]);

  const handleMediaEnd = useCallback(() => {
    if (currentNumber !== null) {
      setDrawnNumbers((prev) => {
        if (!prev.includes(currentNumber)) {
          console.log(`Adding ${currentNumber} to drawn numbers list`);
          return [...prev, currentNumber];
        }
        console.log(`Number ${currentNumber} already in drawn numbers list`);
        return prev;
      });
    }
    setShowMediaOverlay(false);
    setCurrentMedia(null);
  }, [currentNumber]);

  useEffect(() => {
    let drawTimeoutId: NodeJS.Timeout | null = null;

    const scheduleNextDraw = () => {
      if (isDrawing && availableNumbers.length > 0 && !showMediaOverlay && !currentMedia) {
        console.log('Scheduling next draw...');
        drawTimeoutId = setTimeout(() => {
          console.log('Executing scheduled draw');
          drawNumber();
        }, 500);
      }
    };

    scheduleNextDraw();

    return () => {
      if (drawTimeoutId) {
        console.log('Cleaning up draw timeout');
        clearTimeout(drawTimeoutId);
      }
    };
  }, [isDrawing, availableNumbers.length, showMediaOverlay, currentMedia, drawNumber]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const renderNumberGrid = () => {
    const columns = Array.from({ length: 9 }, (_, colIndex) => {
      const start = colIndex * 10 + 1;
      const end = colIndex === 8 ? 90 : start + 9;
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    return (
      <div className="grid grid-cols-9 gap-0">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            {column.map((num) => {
              const isDrawn = drawnNumbers.includes(num);
              const colors = getGridGradientForNumber(num);
              const shouldHaveBottomBorder = num % 10 !== 0;
              return (
                <div
                  key={num}
                  className={`
                    p-2 text-center
                    ${colIndex < 8 ? 'border-r' : ''} 
                    ${shouldHaveBottomBorder ? 'border-b' : ''}
                    transition-colors
                    ${
                      isDrawn
                        ? `text-white font-bold`
                        : currentTheme === 'christmas'
                          ? activeTheme.undrawnNumber
                          : 'text-gray-700'
                    }
                  `}
                  style={{
                    background: isDrawn
                      ? `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`
                      : currentTheme === 'christmas'
                        ? undefined
                        : 'white',
                  }}
                >
                  {num}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      {currentTheme === 'christmas' && (
        <Snowfall
          snowflakeCount={200}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 1,
          }}
        />
      )}

      <div className="container mx-auto p-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Ball Display */}
          <Card
            className={`${activeTheme.numberDisplay} transition-colors border-[#f4f0ec] overflow-hidden`}
          >
            <CardContent className="p-8 text-center">
              <div style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} />
                  <NumberBall
                    number={currentNumber}
                    isAnimating={showMediaOverlay}
                    onAnimationComplete={() => {}}
                    onReveal={() => {}}
                    getColorForNumber={getColorForNumber}
                  />
                </Canvas>
              </div>
              <div className={activeTheme.textColor}>Numbers drawn: {drawnNumbers.length} / 90</div>
            </CardContent>
          </Card>

          {/* TV Screen */}
          <CardContent className="p-4">
            <TVScreen
              mediaUrl={currentMedia?.url || ''}
              mediaType={currentMedia?.type || 'video'}
              videoStart={currentMedia?.start}
              videoEnd={currentMedia?.end}
              youtubeId={currentMedia?.youtubeId}
              onMediaEnd={handleMediaEnd}
              isPlaying={showMediaOverlay}
            />
          </CardContent>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-8 items-center mb-8">
          <div className="flex gap-4">
            <Button
              onClick={initializeGame}
              variant="outline"
              size="lg"
              disabled={isDrawing}
              className={`
                ${
                  currentTheme === 'christmas'
                    ? 'border-[#f4f0ec] text-[#f4f0ec] bg-[#034a21] hover:bg-[#c41e3a] hover:text-[#f4f0ec] disabled:opacity-50 disabled:border-[#f4f0ec]/50 disabled:text-[#f4f0ec]/50'
                    : ''
                }
              `}
            >
              New Game
            </Button>
            <Button
              onClick={() => setIsDrawing(!isDrawing)}
              variant="default"
              size="lg"
              disabled={availableNumbers.length === 0}
              className={`
                ${
                  currentTheme === 'christmas'
                    ? 'bg-[#c41e3a] text-[#f4f0ec] hover:bg-[#a01830] disabled:opacity-50'
                    : ''
                }
              `}
            >
              {isDrawing ? 'Pause' : 'Start/Resume'}
            </Button>
          </div>
        </div>

        <Card className={`${activeTheme.cardBackground} transition-colors overflow-hidden`}>
          <CardContent className={`p-0`}>{renderNumberGrid()}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BingoGame;
