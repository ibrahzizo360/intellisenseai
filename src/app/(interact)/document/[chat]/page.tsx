'use client'
import React, { useState, useEffect } from 'react'
import DocumentViewer from '../components/DocumentViewer'
import ChatArea from '../components/ChatArea'
import { usePathname } from 'next/navigation'
import { fetchWithToken } from '@/utils'

const DocumentPage = () => {
  const [file, setFile] = useState<string | null>(null);
  const path = usePathname();
  const split = path.split('/');
  const session_id = split[split.length - 1];

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const session = await fetchWithToken(`get_session/${session_id}`);
        setFile(session.file_url);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchSessionDetails();
  }, [session_id]);

  return (
    <>
      {file && (
        <div className='flex w-full'>
          <DocumentViewer file={file} />
          <ChatArea />
        </div>
      )}
    </>
  );
}

export default DocumentPage;
 