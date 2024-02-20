'use client'// Import useState, useEffect, useRef, and the Transcript component
import React, { useState, useEffect, useRef } from 'react';
import MovieClip from './Clip';
import Transcript from './Transcript'; // Update the import path as necessary

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const transcript = [
    {"text":"- [Will] That's hot.\n(bright upbeat music)","start":0.0,"duration":2.233},
    {"text":"- All right, so this is\nsimultaneously really impressive","start":2.233,"duration":4.847},
    {"text":"- and really frightening at the same time,","start":7.08,"duration":3.66},
    {"text":"- and it's hitting me in ways\nthat I didn't really expect.","start":10.74,"duration":1.95},
    {"text":"- So do you remember Will\nSmith eating spaghetti?","start":12.69,"duration":2.49},
    {"text":"- Do you remember when this","start":15.18,"duration":1.14},
    {"text":"- was what AI generated videos looked like?","start":16.32,"duration":2.07},
    {"text":"- Remember when we said, \"Okay,\nthis AI stuff is cool and all","start":18.39,"duration":2.557}
  ];

  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.getCurrentTime());
  };
  console.log('currentTime', currentTime)

  const handleSeekTo = (timeInSeconds?: number) => {
    if (player) {
      player.seekTo(timeInSeconds, true);
    }
  };

  const handleSeeking = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleSeekTo(10);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Learning Assistant</h1>
      <p className="text-lg mb-2">Welcome to Learning Assistant</p>
      <form className="flex flex-col items-center">
        <label htmlFor="search" className="text-lg mb-2">
          Enter video URL:
        </label>
        <input
          type="text"
          id="search"
          className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:border-blue-500"
          placeholder="https://www.youtube.com/watch?v=SSjdRXwqg_U"
        />
        <button className="my-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Generate
        </button>
        <MovieClip
          video_id="NXpdyAWLDas"
          onTimeUpdate={handleTimeUpdate}
          onSeekTo={handleSeekTo}
          setPlayer={setPlayer}
        />
        {/* Display the Transcript component */}
        <Transcript transcript={transcript} currentTime={currentTime} />
      </form>
    </main>
  );
}
