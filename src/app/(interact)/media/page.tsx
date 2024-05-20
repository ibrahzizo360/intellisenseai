'use client';
import React, { useState } from 'react';
import ChatArea from '@/components/ChatArea';
import Loader from '@/components/loaders/Loader';
import { NotificationManager } from 'react-notifications';
import getYouTubeID from 'get-youtube-id';
import Link from 'next/link';
import Axios from '@/utils/axios';
import Image from 'next/image';

export default function MediaPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [videoId, setVideoId] = useState<string>('');
  const [videoLink, setVideoLink] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
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
    <main className="w-[80vw] h-full px-10">
        <form className="flex flex-col items-center" onSubmit={generateTranscript}>
          <Link href={'/'}><Image src='/logo-round.svg' height={90} width={90} alt='logo' className='mb-7 mt-12' /></Link>

          <div className="flex justify-center items-center gap-5 mb-7">
            <Image src={'/YouTube.svg'} width={70} height={70} alt="youtube-logo" className="" /> 

            <h2 className="font-semibold text-xl">Youtube Video Interaction</h2>
          </div>

          <p className={`text-xl w-[587px] text-center text-gray-600 mb-16`}>Enter a valid youtube link to enjoy seamless interactions with video contents</p>

          <div className="flex flex-col -ml-28 w-full items-center gap-6 justify-start">

          <div className="flex w-full items-center gap-6 justify-center">
          <label htmlFor="search" className="text-lg font-light w-72">
            Enter/Paste youtube video URL:
          </label>
          <input
            type="text"
            id="search"
            value={videoLink}
            onChange={onInputChanged}
            className="border border-gray-300 rounded-lg px-5 py-2 w-1/2 text-gray-600 text-lg focus:outline-none bg-[#e7fefc]"
            placeholder="https://www.youtube.com/watch?v=SSjdRXwqg_U"
          />
          </div>

          <div className="flex w-full items-center gap-6 justify-center">
          <label htmlFor="title" className="text-lg font-light w-72">
            Enter content title:
          </label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-5 py-2 w-1/2 text-gray-600 text-lg focus:outline-none bg-[#e7fefc]"
            placeholder="Title"
          />
          </div>

          </div>




          <button
            type="submit"
            className="mt-20 bg-[#A43697] hover:bg-[#aa469e] text-xl  text-white py-3 px-12 rounded-md focus:outline-none focus:ring-offset-2"
          >
            Start Interacting
          </button>
        </form>

      {loading && <Loader />}
    </main>
  );
}
