
import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Options } from "youtube-player/dist/types";

interface MovieClipProps {
  video_id: string;
  onTimeUpdate: (event: any) => void;
  onSeekTo: (timeInSeconds?: number) => void;
  setPlayer: React.Dispatch<React.SetStateAction<any>>; // Setter function for the player reference
}

const MovieClip: React.FC<MovieClipProps> = ({
  video_id,
  onTimeUpdate,
  onSeekTo,
  setPlayer,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const options: Options = {
    height: '335',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  const handleReady = (event: { target: any }) => {
    // Set the player reference when the player is ready
    setPlayer(event.target);
    event.target.pauseVideo();
  };

  const handleStateChange = (event: { target: any, data: number }) => {
    if (event.data === 1) {
      // Start listening to time updates when the video starts playing
      const intervalId = setInterval(() => {
        onTimeUpdate(event);
      }, 1); // Call onTimeUpdate every 1 second

      // Store the interval ID so we can clear it later
      intervalRef.current = intervalId;
    } else {
      // Stop the interval when the video stops playing
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Reset intervalId
      }
    }
  };

  return (
    <YouTube
      videoId={video_id}
      opts={options}
      onReady={handleReady}
      onStateChange={handleStateChange}
      id="video"
      className="rounded-md"
    />
  );
};

export default MovieClip;
