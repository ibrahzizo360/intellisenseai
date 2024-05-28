'use client'
import React, { useState, useEffect } from 'react'
import DocumentViewer from '../components/DocumentViewer'
import ChatArea from '../components/ChatArea'
import { usePathname } from 'next/navigation'
import { fetchWithToken } from '@/utils'
import { useDispatch } from 'react-redux'
import { setMessages } from '@/store/chat-slice'

const DocumentPage = () => {
  const [file, setFile] = useState<string | null>(null);
  const path = usePathname();
  const split = path.split('/');
  const session_id = split[split.length - 1];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const session = await fetchWithToken(`get_session/${session_id}`);
        setFile(session.file_url);
        dispatch(setMessages(session.chat_history));
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchSessionDetails();
  }, [session_id, dispatch]);

  return (
    <>
      {file && (
        <div className='flex w-[80vw]'>
          <DocumentViewer file={file} />
          <ChatArea session_id={session_id} />
        </div>
      )}
    </>
  );
}

export default DocumentPage;
 