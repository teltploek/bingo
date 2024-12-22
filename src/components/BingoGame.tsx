'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { themes } from '@/lib/themes';
import dynamic from 'next/dynamic';
import {
  MediaConfig,
  mediaMapping,
  introVideos,
  IntroVideo,
  pauseVideos,
  PauseVideo,
} from '@/lib/mediaConfig';
import { Canvas } from '@react-three/fiber';
import NumberBall from './NumberSphere';
import TVScreen from './TVScreen';
import CircusLights from './CircusLights';
import SideDecorations from './SideDecorations';

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
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [selectedIntroVideo, setSelectedIntroVideo] = useState<IntroVideo | null>(null);
  const [isFreshGame, setIsFreshGame] = useState(true);
  const [showPauseVideo, setShowPauseVideo] = useState(false);
  const [selectedPauseVideo, setSelectedPauseVideo] = useState<PauseVideo | null>(null);
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
    setIsFreshGame(true); // Set to true when initializing a new game
    setShowIntroVideo(false); // Reset intro video state
    setSelectedIntroVideo(null);
  }, []);

  const toggleDrawing = useCallback(() => {
    if (isFreshGame) {
      // If it's a fresh game, play intro video first
      const randomIntroVideo = introVideos[Math.floor(Math.random() * introVideos.length)];
      setSelectedIntroVideo(randomIntroVideo);
      setShowIntroVideo(true);
      setIsFreshGame(false);
    } else if (isDrawing) {
      // If we're currently drawing (i.e., pausing the game)
      const randomPauseVideo = pauseVideos[Math.floor(Math.random() * pauseVideos.length)];
      setSelectedPauseVideo(randomPauseVideo);
      setShowPauseVideo(true);
      setIsDrawing(false);
    } else {
      // If we're resuming after a pause
      setIsDrawing(true);
    }
  }, [isFreshGame, isDrawing]);

  const handleIntroVideoEnd = useCallback(() => {
    setShowIntroVideo(false);
    setSelectedIntroVideo(null);
    setIsDrawing(true); // Start drawing numbers after intro ends
  }, []);

  const handlePauseVideoEnd = useCallback(() => {
    console.log('Pause video ended');
    setShowPauseVideo(false);
    setSelectedPauseVideo(null);
    // Do not set isDrawing here - let the toggleDrawing function handle that
  }, []);

  const drawNumber = useCallback(() => {
    // Check if we can draw

    if (showIntroVideo) {
      console.log('Intro video is playing, cannot draw');
      return;
    }

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
    const drawn = availableNumbers[randomIndex];
    const mediaForNumber = mediaMapping[drawn];

    console.log(`Drawing number ${drawn}. Available numbers: ${availableNumbers.length}`);

    if (mediaForNumber) {
      setCurrentNumber(drawn);
      setCurrentMedia(mediaForNumber);
      setShowMediaOverlay(true);
    }
  }, [availableNumbers, showMediaOverlay, currentMedia, showIntroVideo]);

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
                    ${colIndex < 8 ? 'border-r border-white/20 border-opacity-20' : ''} 
                    ${shouldHaveBottomBorder ? 'border-b border-white/20 border-opacity-20' : ''}
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
    <>
      {(showIntroVideo || showPauseVideo) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="w-full max-w-6xl p-4">
            <TVScreen
              mediaUrl=""
              mediaType="youtube"
              youtubeId={
                showIntroVideo ? selectedIntroVideo?.youtubeId : selectedPauseVideo?.youtubeId
              }
              videoStart={showIntroVideo ? selectedIntroVideo?.start : selectedPauseVideo?.start}
              videoEnd={showIntroVideo ? selectedIntroVideo?.end : selectedPauseVideo?.end}
              onMediaEnd={showIntroVideo ? handleIntroVideoEnd : handlePauseVideoEnd}
              isPlaying={showIntroVideo || showPauseVideo}
              size="large"
            />
          </div>
        </div>
      )}
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
        <SideDecorations /> {/* This is where I added it */}
        {/* Video Overlays */}
        <div className="container mx-auto p-4 max-w-6xl relative z-10 mt-2">
          {/* Logo */}
          <div className="flex justify-center mb-6 mt-4">
            <div className="relative">
              <CircusLights />
              <svg
                width="116"
                height="130"
                viewBox="0 0 116 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-glow"
                style={{
                  filter:
                    'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
                }}
              >
                <defs>
                  <filter id="logoGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="white" floodOpacity="0.5" result="glow" />
                    <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                    <feMerge>
                      <feMergeNode in="softGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g clipPath="url(#clip0_1_6)" filter="url(#logoGlow)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3942 16.4448C19.8274 16.4448 21.9273 17.3425 21.3032 18.2958C18.4615 22.6371 15.5432 32.534 12.548 47.9863C17.1046 39.2663 21.1882 34.6592 24.7986 34.1647C30.2145 33.4232 32.5073 37.8265 31.0675 45.9913C26.9523 69.3264 10.1709 70.7943 13.4335 67.649C16.6964 64.504 23.4955 47.9863 21.06 44.8806C20.1974 43.7808 9.7439 62.9605 12.0104 70.9148C12.5633 72.8553 7.35032 71.8081 7.08131 71.4967C0.41384 63.7772 11.2806 16.4448 18.3942 16.4448ZM42.0098 26.8189C38.1547 26.4302 35.8023 34.954 34.7523 43.0473C33.8114 50.3015 33.8217 57.5044 36.1599 59.076C39.4576 61.293 44.6067 54.8318 51.607 39.6932C52.0255 47.872 54.3124 51.9614 58.4677 51.9614C59.9746 51.9614 57.4283 45.7921 58.8542 37.9976C61.327 24.4831 63.5841 20.6566 58.4677 19.5001C55.9372 18.9281 53.2953 22.0975 51.607 29.6682C49.7199 38.1299 45.3871 46.875 43.2523 48.3265C39.1098 51.1431 49.3073 27.5549 42.0098 26.8189ZM67.9837 17.2687C63.9493 26.9323 72.2644 36.7244 71.4888 40.4172C70.7129 44.1101 66.8756 38.7911 65.79 42.8339C64.7046 46.8766 75.7748 48.1331 78.1341 40.4172C79.5191 35.8874 76.8817 31.9521 75.7748 27.224C74.7798 22.9761 74.7537 18.8156 76.1619 17.2687C79.1137 14.0257 80.1719 20.2288 82.8546 15.0101C83.7424 13.2832 79.7094 10.1122 74.3471 12.5468C71.9677 13.6271 69.3878 13.9049 67.9837 17.2687ZM93.795 5.92667C88.5447 5.00828 86.6582 13.8253 85.6573 22.6546C84.8766 29.5373 84.3876 36.5634 87.3352 37.6904C92.4186 39.6336 97.3638 33.4945 102.171 19.2729C102.386 27.4429 101.044 35.8159 98.1442 44.3916C95.2447 52.9674 92.1693 55.9931 88.9179 53.4686C91.2428 59.6441 95.4833 58.5585 101.639 50.2111C110.874 37.6904 112.655 2.73864 108.623 0.496599C105.352 -1.32201 103.254 1.59968 100.021 13.4649C99.2079 16.4469 98.5586 18.8895 96.8569 22.6543C92.3621 32.5988 93.5972 26.9273 94.9603 19.7113C96.0913 13.7246 98.122 6.6836 93.795 5.92667ZM5 91.2891C11.5844 89.0719 16.4285 87.5107 19.5318 86.6052C33.8842 82.4178 43.9244 79.6996 50.6659 77.8203C69.1366 72.6715 81.9265 68.719 91.243 65.9753C102.267 62.7288 108.158 61.3017 108.648 60.9461C109.552 60.2897 112.303 60.9937 110.15 62.3082C109.55 62.6739 106.923 63.2827 105.535 63.719C101.24 65.0679 98.5167 65.7816 86.1873 69.0327C80.7829 70.4578 80.7252 70.4435 73.3808 72.6713C63.025 75.8131 53.5331 78.2564 45.3356 80.6983C32.1124 84.6368 18.6671 88.335 5 91.7928V91.2891Z"
                    fill="white"
                  />
                </g>
                <path
                  d="M20.8194 101.711C21.4426 102.306 21.4438 103.299 20.8345 103.992C20.2169 104.655 19.2852 104.639 18.6084 104.092C17.9769 103.466 17.9283 102.419 18.5459 101.757C19.079 101.15 20.1879 101.085 20.8194 101.711ZM20.2686 108.186C19.3295 112.347 17.38 119.66 15.4484 122.961C14.0455 125.391 11.9989 127.397 8.84615 128.242C7.70249 128.548 7.70027 128.416 7.37017 128.173C7.20512 128.052 7.14049 127.44 7.58979 127.386C9.0387 127.229 10.0476 126.296 11.0008 125.279C13.6235 122.456 14.0167 118.607 16.7409 107.508C17.0178 106.44 17.8949 105.509 19.0557 105.761C20.3567 106.042 20.5207 107.025 20.2686 108.186ZM35.4595 103.486C35.4971 103.873 35.3801 104.302 35.2835 104.56C34.7554 105.927 34.2566 107.651 33.6242 109.742C32.6387 112.988 32.7249 114.422 32.9192 114.9C33.0578 115.294 32.4434 115.227 32.1465 115.107C30.676 114.441 29.653 112.231 31.0927 107.836C27.4563 114.542 25.927 116.376 24.6167 116.926C22.474 117.832 21.7071 116.083 22.2098 114.126C22.8069 111.779 23.9342 108.197 24.7333 105.863C25.14 104.661 25.741 103.937 26.8958 104.29C28.3309 104.7 28.0335 105.94 27.709 106.954C26.8609 109.6 25.5994 113.052 25.94 113.458C26.0432 113.596 26.2739 113.467 26.6547 113.034C27.0356 112.601 28.8055 110.304 30.2161 107.409C30.8988 106 31.7768 104.208 31.9865 103.754C32.0688 103.566 32.2989 102.941 32.7912 102.677C33.4607 102.332 34.0359 102.377 34.3555 102.457C34.8854 102.58 35.364 102.882 35.4595 103.486ZM45.9258 92.2337C44.9341 93.7252 43.4402 97.6702 42.783 99.6684C39.93 108.185 39.6991 111.527 39.6815 112.326C39.6473 113.064 39.9774 113.307 39.8251 113.481C39.436 113.883 38.3657 113.474 37.6944 112.329C36.4572 110.308 37.1706 107.036 38.916 101.433C39.8955 98.2887 41.8435 93.195 43.1163 92.2576C43.3614 92.0595 43.4911 91.9253 44.0618 91.7061C44.9416 91.4041 45.3931 91.4819 45.6901 91.6011C46.0263 91.743 46.1008 92.0211 45.9258 92.2337ZM53.5921 98.2961C54.1658 100.561 51.0558 104.409 47.4553 104.943C45.9142 110.69 49.153 109.424 51.8679 106.08C51.9893 105.914 52.3331 105.59 52.5992 105.718C52.921 105.93 52.841 106.249 52.5982 106.58C52.0507 107.256 51.3674 108.168 50.4429 109.045C49.6791 109.78 48.1304 110.924 46.6859 111.344C45.3341 111.739 44.0663 111.582 43.5964 109.952C42.8886 107.558 44.0745 104.689 44.9095 103.107C46.3019 100.514 48.4797 98.0095 51.3151 97.2166C52.3578 96.9041 53.2857 97.1524 53.5921 98.2961ZM52.0527 98.6092C51.1347 98.0269 48.533 101.176 47.6849 103.821C49.8221 103.514 52.9315 99.1688 52.0527 98.6092ZM65.1385 93.7114C67.4435 94.1539 65.4272 100.724 64.8803 101.897C63.9366 103.939 62.0474 106.532 59.9439 107.46C59.2888 107.735 58.6231 107.847 58.1572 107.84C57.3801 107.783 57.0411 107.012 57.6554 107.08C60.4159 107.367 62.4934 100.284 62.73 98.1997C63.1117 95.0496 59.8589 100.095 59.4063 100.879C58.4251 102.534 57.7159 104.214 57.3959 105.493C57.1249 106.46 56.9843 107.79 57.3007 108.599C57.3813 108.776 57.2538 109.043 56.9425 108.993C55.7364 108.82 55.1827 107.742 54.8724 106.832C54.169 104.701 55.2836 100.824 56.528 96.8137C57.1317 94.863 58.0477 92.0997 59.3165 89.5401C60.2624 87.6302 61.0699 87.182 61.6798 86.9854C62.0115 86.8634 62.4917 86.801 62.7247 86.8048C63.4008 86.8556 63.7927 87.0818 63.2927 87.8121C62.2844 89.2418 59.4232 97.7275 58.5198 100.785C60.3907 96.64 63.1138 93.3263 65.1385 93.7114ZM73.3113 88.4737C73.9964 89.0521 74.0285 90.0373 73.4583 90.7533C72.8799 91.4383 71.9339 91.4931 71.2345 90.9848C70.5803 90.3981 70.4925 89.3284 71.0709 88.6433C71.5957 88.0057 72.6572 87.887 73.3113 88.4737ZM72.1746 92.8862C72.6968 93.4751 72.4403 94.3721 72.2245 94.9268C71.639 96.5745 69.398 103.171 69.9794 104.97C70.1262 105.395 69.4666 105.406 69.3573 105.369C68.1491 105.063 67.3662 103.749 67.2364 102.028C67.1651 101.02 67.3637 99.9066 67.6324 98.8076C67.9155 97.6385 69.082 94.0793 69.4192 93.3595C69.5693 93.0542 69.7172 92.6171 70.4364 92.4575C71.3411 92.2482 71.9847 92.6721 72.1746 92.8862ZM86.9649 90.7121C86.4412 92.3432 86.2564 92.8897 85.5704 95.0281C85.0324 96.7293 84.3532 99.2635 84.7236 100.522C84.8313 100.924 84.2893 101.003 83.9553 100.993C81.2816 100.782 81.3966 97.0078 82.9208 92.5577C83.3871 91.207 82.4521 91.9213 81.9868 92.4104C80.9266 93.5227 80.4243 94.1211 78.9596 96.5676C77.6842 98.7314 76.6799 101.783 76.3389 102.736C76.154 103.283 75.2946 103.413 74.5627 103.278C73.5812 103.077 73.1655 101.897 73.9397 99.4697C74.3381 98.2366 74.8535 96.5745 75.3689 94.9125C75.9439 93.102 76.2397 92.2277 76.6795 91.1491C76.8953 90.5943 77.1177 90.4353 77.6741 90.2863C77.9832 90.2034 78.348 90.2051 78.9111 90.4517C79.8969 90.9164 79.5973 92.0237 79.3181 92.9599C79.0532 93.8259 78.6526 94.9271 77.96 96.6698C79.3193 93.9534 81.3806 90.5189 84.1243 88.8892C84.8926 88.4183 85.789 88.1781 86.3294 88.464C87.668 89.1323 87.0758 90.3842 86.9649 90.7121ZM99.8623 85.8649C99.9286 86.1121 99.9292 86.6089 99.7233 86.8297C99.5174 87.0505 99.2227 87.0633 99.0516 87.0428C98.5774 87.0042 98.5293 86.4539 97.9211 86.2856C97.6015 86.2056 97.214 86.2432 96.4909 86.6357C93.1991 88.4453 91.7441 93.7714 91.7188 95.0371C91.6957 96.4347 92.7185 96.7901 95.5751 91.2541C95.7252 90.9489 96.0601 90.0972 96.383 89.4475C96.8786 88.4533 97.2881 87.8798 98.3931 88.0475C99.358 88.1865 99.8251 89.1877 99.7396 90.1051C99.6012 91.5667 99.4153 92.9748 98.8182 95.3213C97.8355 99.1957 96.2307 103.469 94.0297 105.516C93.0517 106.441 91.5233 107.413 90.2869 107.745C89.3597 107.993 88.498 107.992 88.3075 107.281C88.0259 106.23 89.1316 106.895 89.8734 106.696C91.1098 106.365 92.1474 105.292 92.9846 103.841C95.0128 100.283 95.9645 94.562 96.2314 91.9727C91.9792 100.831 88.8821 99.9052 88.5039 99.112C87.2413 96.5019 89.7035 88.7525 94.1776 86.1623C94.9233 85.7306 95.5558 85.4949 96.1431 85.3375C98.1296 84.8384 99.6304 84.9994 99.8623 85.8649ZM110.59 83.6199C111.575 87.2981 107.826 94.6965 103.839 95.7649C98.9245 97.0818 100.824 84.017 107.222 82.3026C107.778 82.1536 108.29 82.0829 108.628 82.3566C108.715 82.4328 109.078 82.7992 108.831 82.8655C108.513 82.9174 108.336 82.998 108.021 83.1819C106.608 84.0905 105.851 85.221 105.047 87.2915C104.244 89.362 103.943 92.6893 104.811 93.0861C105.867 93.5651 108.745 90.21 108.936 84.4938C108.931 84.23 108.714 83.2944 109.68 83.0686C110.09 82.9918 110.474 83.1872 110.59 83.6199Z"
                  fill="white"
                  filter="url(#logoGlow)"
                />
                <defs>
                  <clipPath id="clip0_1_6">
                    <rect width="106" height="92" fill="white" transform="translate(5)" />
                  </clipPath>
                </defs>
              </svg>
              <style jsx>{`
                .logo-glow {
                  animation: logoGlow 6s ease-in-out infinite;
                }
                @keyframes logoGlow {
                  0%,
                  100% {
                    opacity: 1;
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))
                      drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
                  }
                  50% {
                    opacity: 0.85;
                    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))
                      drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Updated Ball Display and TV Screen Grid */}
          <div className="grid grid-cols-2 gap-8 mt-8 mb-20">
            <div className=" text-center h-full flex flex-col justify-center items-center">
              <div style={{ width: '200px', height: '200px' }}>
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
              <div className={`${activeTheme.textColor} mt-4`}>
                Antal udtrukne tal: {drawnNumbers.length} / 90
              </div>
            </div>

            <TVScreen
              mediaUrl={currentMedia?.url || ''}
              mediaType={currentMedia?.type || 'video'}
              videoStart={currentMedia?.start}
              videoEnd={currentMedia?.end}
              youtubeId={currentMedia?.youtubeId}
              onMediaEnd={handleMediaEnd}
              isPlaying={showMediaOverlay}
              size="normal"
            />
          </div>

          {/* Rest of the component remains unchanged */}
          <div className="flex flex-col gap-8 items-center mb-14">
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
                Nyt spil
              </Button>
              <Button
                onClick={toggleDrawing}
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
                {isDrawing ? 'Bingo!' : 'Start!'}
              </Button>
            </div>
          </div>

          <Card
            className={`${activeTheme.cardBackground} transition-colors overflow-hidden border border-white/20`}
          >
            <CardContent className={`p-0`}>{renderNumberGrid()}</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BingoGame;
