'use client';
import React, { useState } from 'react';
import ChatArea from '@/components/video/ChatArea';
import Loader from '@/components/loaders/Loader';
import { NotificationManager } from 'react-notifications';
import getYouTubeID from 'get-youtube-id';
import MovieClip from '@/components/video/Clip';
import Transcript from '@/components/video/Transcript';
import Link from 'next/link';
import Axios from '@/utils/axios';
import Image from 'next/image';

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
    const id = getYouTubeID(url);
    return id;
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
      const response = await Axios.get(`transcript?video_url=${videoLink}`);
      if (response.status != 200) {
        setLoading(false);
        NotificationManager.error('Failed to fetch transcript data', 'Error', 3000);
        throw new Error('Failed to fetch transcript data');
      }
      const data = await response.data;
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
    <main className="flex-1 flex-col items-center justify-center w-screen h-full pt-16 px-10">
      {showForm && (
        <form className="flex flex-col items-center" onSubmit={generateTranscript}>

          <Link href={'/'}><Image src='/logo-round.svg' height={90} width={90} alt='logo' className='mb-10' /></Link>

          <div className="flex justify-center items-center gap-5 mb-7">
            <Image src={'/YouTube.svg'} width={70} height={70} alt="youtube-logo" className="" /> 

            <h2 className="font-semibold text-xl">Youtube Video Interaction</h2>
          </div>

          <p className={`text-xl w-[587px] text-center text-gray-600`}>Enter a valid youtube link to enjoy seamless interactions with video contents</p>


          <label htmlFor="search" className="text-2xl my-6 mt-16 font-light">
            Enter youtube video URL:
          </label>
          <input
            type="text"
            id="search"
            value={videoLink}
            onChange={onInputChanged}
            className="border border-gray-300 rounded-lg px-6 py-3 text-gray-600 text-xl w-[50%] focus:outline-none bg-[#e7fefc]"
            placeholder="https://www.youtube.com/watch?v=SSjdRXwqg_U"
          />
          <button
            type="submit"
            className="my-10 bg-[#A43697] hover:bg-[#aa469e] text-xl  text-white py-3 px-12 rounded-md focus:outline-none focus:ring-offset-2"
          >
            Start Learning
          </button>
        </form>
      )}

      {loading && <Loader />}

      {transcript.length > 0 && (
        <div>
            <div className='flex justify-between'>
                <Link href={'/'}><h2 className="text-sm font-bold mb-2 text-purple-700 cursor-pointer hover:text-purple-400">Go back Home</h2></Link>
                <h2 className="text-sm font-bold my-1">Video Interaction</h2>
            </div>
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
        </div>
      )}
    </main>
    </div>
  );
}
