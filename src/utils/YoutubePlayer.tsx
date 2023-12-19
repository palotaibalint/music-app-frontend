import React, { useState, useEffect, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface YouTubePlayerProps {
  url: string;
}

function extractYouTubeID(url: string): string | null {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const YouTubePlayerUtil: React.FC<YouTubePlayerProps> = ({ url }) => {
  const [videoId, setVideoId] = useState<string | null>(extractYouTubeID(url));
  const playerRef = useRef<YouTube>(null);

  useEffect(() => {
    setVideoId(extractYouTubeID(url));
  }, [url]);

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      {videoId && <YouTube videoId={videoId} opts={opts} ref={playerRef} />}
    </div>
  );
};

export default YouTubePlayerUtil;
