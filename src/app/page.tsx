'use client'
import React, { useState } from 'react';
import MovieClip from './Clip';
import Transcript from './Transcript';
import ChatArea from '@/components/ChatArea';
import { api_url } from '@/utils';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [videoId, setVideoId] = useState<string>('');
  const [videoLink, setVideoLink] = useState('');
  const [showForm, setShowForm] = useState(true); // Control the visibility of the form

  const getVideoId = (url: string) => {
    const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return videoIdMatch[1];
    }
    return '';
  };

  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.getCurrentTime());
  };

  const handleSeekTo = (timeInSeconds?: number) => {
    if (player) {
      player.seekTo(timeInSeconds, true);
    }
  };

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(event.target.value);
  }

  const generateTranscript = async (event: any) => {
    event.preventDefault();
    const url = videoLink;
    if (!url) return;
    
    const id = getVideoId(url);
    if (!id) {
      console.error('Invalid YouTube video URL');
      return;
    }
    
    try {
      const response = await fetch(`${api_url}/transcript?videoId=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transcript data');
      }
      const data = await response.json();
      setTranscript(data.transcript);
      setVideoId(id);
      setShowForm(false); // Hide the form after fetching transcript data
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  };

  return (
    <main className="flex flex-col w-[95vw] mx-auto max-h-screen p-10">
      {showForm && (
        <>
          <h1 className="text-4xl font-bold mb-4">Learning Assistant</h1>
          <p className="text-lg mb-2">Welcome to Learning Assistant</p>
          <form className="flex flex-col items-center">
            <label htmlFor="search" className="text-lg mb-2">
              Enter video URL:
            </label>
            <input
              type="text"
              id="search"
              value={videoLink}
              onChange={onInputChanged}
              className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:border-blue-500"
              placeholder="https://www.youtube.com/watch?v=SSjdRXwqg_U"
            />
            <button onClick={generateTranscript} className="my-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Generate
            </button>
          </form>
        </>
      )}

      {transcript.length > 0 && (
        <>
        <div className='flex gap-7 lg:flex-row flex-col'>
          <div className='rounded-md'>
            <MovieClip
              video_id={videoId}
              onTimeUpdate={handleTimeUpdate}
              onSeekTo={handleSeekTo}
              setPlayer={setPlayer}
            />
            {/* Display the Transcript component */}
            <Transcript transcript={transcript} currentTime={currentTime} />
          </div>
          <ChatArea />
        </div>
        </>
      )}
    </main>
  );
}
