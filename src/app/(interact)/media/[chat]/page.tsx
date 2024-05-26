'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchWithToken } from '@/utils';
import { useDispatch } from 'react-redux';
import { setMessages } from '@/store/chat-slice';
import MovieClip from '@/components/Clip';
import Transcript from '@/components/Transcript';
import ChatArea from '../components/ChatArea';

const VideoPage = () => {
  const path = usePathname();
  const split = path.split('/');
  const session_id = split[split.length - 1];
  const [video_url, setVideoUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<any>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [player, setPlayer] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const session = await fetchWithToken(`get_session/${session_id}`);
        setVideoUrl(session.video_url);
        dispatch(setMessages(session.chat_history));
        setTranscript(session.transcript); // Assuming the session includes a transcript
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchSessionDetails();
  }, [session_id, dispatch]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleSeekTo = (timeInSeconds?: number) => {
    if (player) {
      player.seekTo(timeInSeconds, true);
    }
  };

  return (
    <>
      {video_url && (
        <div className="rounded-md mt-4">
          <MovieClip
            video_id={video_url}
            onTimeUpdate={handleTimeUpdate}
            onSeekTo={handleSeekTo}
            setPlayer={setPlayer}
          />
          <Transcript transcript={transcript} currentTime={currentTime} player={player} />

          <div className="flex justify-between items-center mt-2">
            <button className="rounded-md px-2 py-1 text-xs text-white bg-[#A43697]">Keep original language</button>
            <button className="rounded-md px-2 py-1 text-xs text-white bg-[#A43697]">Change transcript language</button>
          </div>
        </div>
      )}

      {transcript && <ChatArea transcript={transcript} />}
    </>
  );
};

export default VideoPage;
