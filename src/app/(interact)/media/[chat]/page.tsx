'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { fetchWithToken } from '@/utils'
import { useDispatch } from 'react-redux'
import { setMessages } from '@/store/chat-slice'

const VideoPage = () => {
    const path = usePathname();
    const split = path.split('/');
    const session_id = split[split.length - 1];
    const [video_url, setVideoUrl] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
            const session = await fetchWithToken(`get_session/${session_id}`);
            setVideoUrl(session.video_url);
            dispatch(setMessages(session.chat_history));
            } catch (error) {
            console.log('error', error);
            }
        };

        fetchSessionDetails();
        }, [session_id, dispatch]);
  return (
    <div>VideoPage</div>
  )
}

export default VideoPage