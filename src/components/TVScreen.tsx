import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import YouTubePlayer from './YouTubePlayer';
import { Button } from '@/components/ui/button';

interface TVProps {
  mediaUrl: string;
  mediaType: 'video' | 'gif' | 'youtube';
  videoStart?: number;
  videoEnd?: number;
  youtubeId?: string;
  onMediaEnd: () => void;
  isPlaying: boolean;
  size?: 'normal' | 'large';
  isIntro?: boolean;
  isPause?: boolean;
  onSkip?: () => void;
}

const TVScreen: React.FC<TVProps> = ({
  mediaUrl,
  mediaType,
  videoStart,
  videoEnd,
  youtubeId,
  onMediaEnd,
  isPlaying,
  size = 'normal',
  isIntro = false,
  isPause = false,
  onSkip,
}) => {
  const [isOn, setIsOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const springs = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: isPlaying ? 1 : 0.3,
    },
    config: {
      tension: 200,
      friction: 20,
    },
  });

  const heightClass = size === 'large' ? 'h-[1080px]' : 'h-[480px]';

  useEffect(() => {
    setIsOn(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (mediaType !== 'video' || !videoRef.current || !isPlaying) return;

    const video = videoRef.current;

    const playVideo = async () => {
      try {
        if (typeof videoStart === 'number') {
          video.currentTime = videoStart;
        }
        await video.play();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };

    const checkTime = () => {
      if (!video) return;
      const endTime = typeof videoEnd === 'number' ? videoEnd : video.duration;
      if (video.currentTime >= endTime) {
        video.pause();
        onMediaEnd();
      }
    };

    playVideo();
    video.addEventListener('timeupdate', checkTime);

    return () => {
      video.removeEventListener('timeupdate', checkTime);
    };
  }, [isPlaying, mediaType, videoStart, videoEnd, onMediaEnd]);

  const renderMedia = () => {
    switch (mediaType) {
      case 'youtube':
        return youtubeId ? (
          <YouTubePlayer
            videoId={youtubeId}
            start={videoStart}
            end={videoEnd}
            onEnd={onMediaEnd}
            size={size}
          />
        ) : null;
      case 'video':
        return (
          <video
            ref={videoRef}
            src={mediaUrl}
            className="w-full h-full object-cover"
            muted={false}
          />
        );
      case 'gif':
        return <img src={mediaUrl} alt="GIF content" className="w-full h-full object-cover" />;
      default:
        return null;
    }
  };

  return (
    <animated.div
      style={springs}
      className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${heightClass}`}
    >
      <div className="relative w-full h-full bg-[#333] p-4 rounded-lg">
        <div className="relative w-full h-full bg-black rounded overflow-hidden">
          {/* Intro Text */}
          {isIntro && (
            <div className="absolute top-8 left-0 right-0 z-10 text-center">
              <div className="inline-block bg-black bg-opacity-80 px-8 py-4 rounded-lg">
                <span className="text-white text-2xl font-bold tracking-wide">
                  Spillet starter lige efter denne intro
                </span>
              </div>
            </div>
          )}

          {/* Skip Button - shown for both intro and pause */}
          {(isIntro || isPause) && onSkip && (
            <div className="absolute bottom-8 right-8 z-10">
              <Button
                onClick={onSkip}
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-100 text-black border-2 border-white text-lg font-semibold px-8 py-6 h-auto"
              >
                {isIntro ? 'Spring intro over' : 'Fortsæt spillet'}
              </Button>
            </div>
          )}

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-20" />
          </div>

          {renderMedia()}
        </div>

        <div className="absolute bottom-2 right-2 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-600" />
          <div className="w-3 h-3 rounded-full bg-gray-600" />
        </div>
      </div>
    </animated.div>
  );
};

export default TVScreen;
