'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchWithToken } from '@/utils';
import { useDispatch } from 'react-redux';
import { setMessages } from '@/store/chat-slice';
import MovieClip from '@/components/video/Clip';
import Transcript from '@/components/video/Transcript';
import ChatArea from '../components/ChatArea';
import { getVideoId } from '../helpers';

const VideoPage = () => {
  const path = usePathname();
  const split = path.split('/');
  const session_id = split[split.length - 1];
  const [video_id, setVideoId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<any>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [player, setPlayer] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const session = await fetchWithToken(`get_session/${session_id}`);
        const retrieved_video_id = getVideoId(session.video_url) ;
        setVideoId(retrieved_video_id);
        dispatch(setMessages(session.chat_history));
        setTranscript(session.transcript); // Assuming the session includes a transcript
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchSessionDetails();
  }, [session_id, dispatch]);

  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.getCurrentTime());
  };

  const handleSeekTo = (timeInSeconds?: number) => {
    if (player) {
      player.seekTo(timeInSeconds, true);
    }
  };

  return (
    <>
      {video_id && (
        <div className="rounded-md mt-4">
          <MovieClip
            video_id={video_id}
            onTimeUpdate={handleTimeUpdate}
            onSeekTo={handleSeekTo}
            setPlayer={setPlayer}
          />
          <Transcript transcript={transcript} currentTime={currentTime} player={player} />

          <div className="flex justify-between items-center mt-2 ml-2">
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
