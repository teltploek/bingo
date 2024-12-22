import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import YouTubePlayer from './YouTubePlayer';

interface TVOverlayProps {
  isVisible: boolean;
  mediaUrl: string;
  mediaType: 'video' | 'gif' | 'youtube'; // Added 'youtube'
  videoStart?: number;
  videoEnd?: number;
  youtubeId?: string; // New prop
  onClose: () => void;
}

const TVOverlay: React.FC<TVOverlayProps> = ({
  isVisible,
  mediaUrl,
  mediaType,
  videoStart,
  videoEnd,
  youtubeId,
  onClose,
}) => {
  const [isOn, setIsOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const springs = useSpring({
    opacity: isOn ? 1 : 0,
    scale: isOn ? 1 : 0.8,
    config: {
      tension: 200,
      friction: 20,
    },
  });

  const renderMedia = () => {
    switch (mediaType) {
      case 'youtube':
        return youtubeId ? (
          <YouTubePlayer videoId={youtubeId} start={videoStart} end={videoEnd} onEnd={onClose} />
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

  // Cast animated.div as any to avoid strict type checking
  const AnimatedDiv = animated.div as any;

  useEffect(() => {
    if (isVisible) {
      // TV turn on effect
      const turnOnTimeout = setTimeout(() => {
        setIsOn(true);
      }, 100);

      return () => clearTimeout(turnOnTimeout);
    } else {
      setIsOn(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaType !== 'video' || !isOn) return;

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
        onClose();
      }
    };

    playVideo();
    video.addEventListener('timeupdate', checkTime);

    return () => {
      video.removeEventListener('timeupdate', checkTime);
    };
  }, [isOn, mediaType, videoStart, videoEnd, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none
        ${isVisible ? 'pointer-events-auto' : 'hidden'}`}
    >
      <AnimatedDiv
        style={{
          opacity: springs.opacity,
          transform: springs.scale.to((s: number) => `scale(${s})`),
        }}
        className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Retro TV Frame */}
        <div className="relative w-[640px] h-[480px] bg-[#333] p-8 rounded-lg">
          {/* Screen */}
          <div className="relative w-full h-full bg-black rounded overflow-hidden">
            {/* Screen Overlay Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-20" />
              {/* <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-5" /> */}
            </div>

            {/* Media Content */}
            {renderMedia()}
          </div>

          {/* TV Controls (Decorative) */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-600" />
            <div className="w-4 h-4 rounded-full bg-gray-600" />
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
};

export default TVOverlay;
