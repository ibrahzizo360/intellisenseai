'use client'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Axios from '@/utils/axios'
import { NotificationManager } from 'react-notifications'
import { acceptStyle, focusedStyle, rejectStyle, baseStyle } from './utils'
import { Progress } from "@/components/ui/progress"
import Loader from '@/components/loaders/Loader'
import Link from 'next/link'
import Image from 'next/image'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '@/store/chat-slice'
import { useRouter } from 'next/navigation'
import ChatArea from './components/ChatArea'
import DocumentViewer from './components/DocumentViewer'
import { store } from '@/store/store'

export interface Message {
  id?: string | number;
  text: string;
  role: 'user' | 'bot';
  page?: number;
}

const UploadDocumentPage = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<null | number>(-1);
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.session.messages);

  const handleScrollToPage = useCallback((pageNumber: number) => {
    console.log('current number', pageNumber)
    setCurrentPage(pageNumber);
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'application/msword': ['.docx', '.doc'],
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt']
    }
  });

  const streamResponse = async (file: any, messageId: number) => {
    const base_url = process.env.NEXT_PUBLIC_API_URL; 
    const url = `${base_url}v2/upload`;
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('access_token')
    const res = await fetch(url,{
      body: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      } 
    });

    if (res.body) {
      var reader = res.body.getReader();
      var decoder = new TextDecoder('utf-8');
      reader.read().then(function processResult(result: any): any {
        if (result.done) return;
        const decoded = decoder.decode(result.value);
        const session_id_match = decoded.match(/'session_id':\s*'([^']+)'/);
        const text_match = decoded.match(/'text':\s*'([^']+)'/);
        const file_match = decoded.match(/'file_url':\s*'([^']+)'/);
        if (session_id_match) {
          // setSessionId(session_id_match[1]);
          window.history.replaceState(null, "", `document/${session_id_match[1]}`)
        }
        if (file_match) {
          const file_url = file_match[1];
          setFileUrl(file_url); 
        }
        if (text_match) {
          let token = text_match[1];
          const currentMessages = store.getState().session.messages;

          const updatedMessages = currentMessages.map((message: Message) => {
            if (message.id === messageId) {
                return { ...message, text: message.text + token, role: 'bot' };
            }
            return message;
          });
          dispatch(setMessages(updatedMessages));
        } 
        setFile(file);
        setLoading(false);
        return reader.read().then(processResult);
      });
    }
  }

  const uploadFile = useCallback(async (acceptedFiles: any) => {
    setLoading(true);
    try {
      const newMessage: any = { id: Date.now(), text: '', role: 'bot' };
      const updatedMessages = [...messages, newMessage];
      dispatch(setMessages(updatedMessages));
      await streamResponse(acceptedFiles[0], newMessage.id);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages: any) => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', role: 'bot' }]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (acceptedFiles.length > 0) uploadFile(acceptedFiles);
  }, [acceptedFiles, uploadFile]);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <main className='h-screen flex w-full'>
      { !file && (
        <div className='flex flex-col mx-auto'>
        <div className='flex flex-col items-center w-full'>
          <Link href={'/'}><Image src='/logo-round.svg' height={90} width={90} alt='logo' className='mb-4 mt-12' /></Link>

          <div className="flex justify-center items-center gap-5 mb-8 mt-10">
            <Image src={'/Document.svg'} width={70} height={70} alt="youtube-logo" className="" />

            <h2 className="font-semibold text-xl">Lecture Notes / Text Assistance</h2>
          </div>

          <p className={`text-xl w-[587px] text-center text-gray-600`}>Upload a valid pdf to enjoy seamless interactions with books, papers, texts, lecture notes etc.</p>


          <label htmlFor="search" className="text-2xl my-6 mt-12 font-light">
            Upload PDF document:
          </label>

          <div {...getRootProps({ style })} className='cursor-pointer mt-6'>
            <input {...getInputProps()} />
            <IoCloudUploadOutline className='text-2xl mr-5' />
            <p className='text-sm'>Drag &apos;n&apos; drop your document here, or click to select document from your device</p>
          </div>
        </div>
    </div>
      )}

      {file && (
        <>
          <DocumentViewer file={fileUrl} />
          <ChatArea />
        </>
      )}

      {loading && <Loader />}
    </main>
  )
}

export default UploadDocumentPage
