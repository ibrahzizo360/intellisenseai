'use client';
import React, { useState } from 'react';
import MovieClip from './Clip';
import Transcript from './Transcript';
import ChatArea from '@/components/ChatArea';
import { api_url } from '@/utils';
import Loader from '@/components/loaders/Loader';
import { NotificationManager } from 'react-notifications';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [videoId, setVideoId] = useState<string>('');
  const [videoLink, setVideoLink] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trancriptText, setTranscriptText] = useState('');

  

  const getVideoId = (url: string) => {
    const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
    return videoIdMatch ? videoIdMatch[1] : '';
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
  };

  const generateTranscript = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const url = videoLink.trim();
    if (!url) return;

    const id = getVideoId(url);
    if (!id) {
      setLoading(false);
      console.error('Invalid YouTube video URL');
      return;
    }

    try {
      const response = await fetch(`${api_url}/transcript?video_url=${videoLink}`);
      if (!response.ok) {
        setLoading(false);
        NotificationManager.error('Failed to fetch transcript data', 'Error', 3000);
        throw new Error('Failed to fetch transcript data');
      }
      const data = await response.json();
      setTranscript(data.response.words);
      setTranscriptText(data.response.text);
      setVideoId(id);
      setShowForm(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      NotificationManager.error('Failed to fetch transcript data', 'Error', 3000);
      console.error('Error fetching transcript:', error);
    }
  };

  return (
    <div>
    <p className='mobile text-center uppercase lg:hidden font-bold text-md mt-[50%]'>please open on a bigger screen</p>
    <main className="flex-1 flex-col items-center justify-center w-screen h-full pt-10 px-10">
      {showForm && (
        <form className="flex flex-col items-center" onSubmit={generateTranscript}>
          <h1 className="text-4xl font-bold mb-4">Welcome to Intellisense AI</h1>
          <p className="text-lg mb-2">Discover a smarter way to learn with Intellisense AI</p>
          <h2 className="text-2xl font-bold my-3">What We Offer</h2>
            <ul className="space-y-2 pl-5">
              <li>
                <strong>Video Interaction:</strong> Interact with videos using AI to generate summaries and quizzes.
              </li>
              <li>
                <strong>Upload Learning Materials:</strong> Easily upload learning materials such as PDFs to interact with and generate quizzes.
              </li>
            </ul>
          <label htmlFor="search" className="text-lg my-3 mt-8">
            Enter video URL to get started:
          </label>
          <input
            type="text"
            id="search"
            value={videoLink}
            onChange={onInputChanged}
            className="border border-gray-300 rounded-md px-4 py-2 w-96 focus:outline-none focus:border-blue-500"
            placeholder="https://www.youtube.com/watch?v=SSjdRXwqg_U"
          />
          <button
            type="submit"
            className="my-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate
          </button>
        </form>
      )}

      {loading && <Loader />}

      {transcript.length > 0 && (
        <div className="flex gap-7 lg:flex-row flex-col ">
          <div className="rounded-md">
            <MovieClip
              video_id={videoId}
              onTimeUpdate={handleTimeUpdate}
              onSeekTo={handleSeekTo}
              setPlayer={setPlayer}
            />
            <Transcript transcript={transcript} currentTime={currentTime} player={player}/>
          </div>
          <ChatArea transcript={trancriptText} />
        </div>
      )}
    </main>
    </div>
  );
}
