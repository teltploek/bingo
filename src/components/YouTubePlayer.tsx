import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  start?: number;
  end?: number;
  onEnd: () => void;
  size?: 'normal' | 'large';
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  start,
  end,
  onEnd,
  size = 'normal',
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const destroyPlayer = () => {
    try {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    } catch (error) {
      console.error('Error destroying YouTube player:', error);
    }
  };

  useEffect(() => {
    if (!window.YT && !isLoadingRef.current) {
      isLoadingRef.current = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        isLoadingRef.current = false;
        initializePlayer();
      };
    } else if (window.YT && !isLoadingRef.current) {
      initializePlayer();
    }

    return () => {
      destroyPlayer();
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (!containerRef.current) return;

    destroyPlayer();

    try {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          start: start || 0,
          end: end,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnd();
            }
          },
          onError: (error: any) => {
            console.error('YouTube player error:', error);
            onEnd();
          },
        },
      });
    } catch (error) {
      console.error('Error initializing YouTube player:', error);
      onEnd();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
