import React from "react";
import YouTube from "react-youtube";
import { Options } from "youtube-player/dist/types";

interface MovieClipProps {
  video_id: string;
  onTimeUpdate: (event: any) => void;
  onSeekTo: (timeInSeconds?: number) => void;
  setPlayer: React.Dispatch<React.SetStateAction<any>>; // Setter function for the player reference
}

class MovieClip extends React.Component<MovieClipProps> {
  private intervalId: NodeJS.Timeout | null = null;
  constructor(props: MovieClipProps) {
    super(props);
    this._onReady = this._onReady.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  render() {
    const { video_id } = this.props;
    const options: Options = {
      height: '340',
      width: '640',
      playerVars: {
        autoplay: 1,
        controls: 1,
      },
    };

    return (
      <YouTube
        videoId={video_id}
        opts={options}
        onReady={this._onReady}
        onStateChange={this._onStateChange}
        id="video"
        className="rounded-md"
      />
    );
  }

  _onReady(event: { target: any }) {
    // Set the player reference when the player is ready
    this.props.setPlayer(event.target);
    event.target.pauseVideo();
  }

  _onStateChange(event: { target: any, data: number }) {
    if (event.data === 1) {
      // Start listening to time updates when the video starts playing
      const intervalId = setInterval(() => {
        this.props.onTimeUpdate(event);
      }, 100); // Call onTimeUpdate every 1 second

      // Store the interval ID so we can clear it later
      this.intervalId = intervalId;
    } else {
      console.log("Video is not playing");
      // Stop the interval when the video stops playing
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null; // Reset intervalId
      }
    }
  }
  
}

export default MovieClip;