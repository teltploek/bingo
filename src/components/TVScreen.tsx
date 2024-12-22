import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import YouTubePlayer from './YouTubePlayer';

interface TVProps {
  mediaUrl: string;
  mediaType: 'video' | 'gif' | 'youtube';
  videoStart?: number;
  videoEnd?: number;
  youtubeId?: string;
  onMediaEnd: () => void;
  isPlaying: boolean;
  size?: 'normal' | 'large'; // New size prop
}

const TVScreen: React.FC<TVProps> = ({
  mediaUrl,
  mediaType,
  videoStart,
  videoEnd,
  youtubeId,
  onMediaEnd,
  isPlaying,
  size = 'normal', // Default to normal size
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

  // Determine height based on size prop
  const heightClass = size === 'large' ? 'h-[640px]' : 'h-[320px]';

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
            size={size} // Pass size to YouTubePlayer
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
