'use client'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import SlideViewer from './components/SlideViewer'
import ChatArea from './components/ChatArea'
import Axios from '@/utils/axios'
import { NotificationManager } from 'react-notifications'
import { acceptStyle, focusedStyle, rejectStyle, baseStyle } from './utils'
import { Progress } from "@/components/ui/progress"
import Loader from '@/components/loaders/Loader'
import Link from 'next/link'
import Image from 'next/image'

export interface Message {
  text: string;
  role: 'user' | 'bot';
  page?: number;
}

const SlidePage = () => {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<null | number>(-1);

  const handleScrollToPage = useCallback((pageNumber: number) => {
    console.log('current number', pageNumber)
    setCurrentPage(pageNumber);
  }, []);

  // const handleScrollToPage = async (pageNumber: number) => {
  //   console.log('current number', pageNumber)
  //   setCurrentPage(pageNumber);
  // };

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
    const url = `${base_url}v1/upload`;
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
        let token = decoder.decode(result.value);
        // Update the message with the streamed data based on the message ID
        setMessages(prevMessages => prevMessages.map((message:any) => {
          if (message.id === messageId) {
            return { ...message, text: message.text + token, role: 'bot' };
          }
          return message;
        }));
        setFile(file);
        setLoading(false);
        return reader.read().then(processResult);
      });
    }
  }

  // const uploadFile = useCallback(async (acceptedFiles: any) => {
  //   const formData = new FormData();
  //   formData.append('file', acceptedFiles[0]);
  //   const token = localStorage.getItem('access_token')

  //   try {
  //     setLoading(true)
  //     const response = await Axios.post('v1/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${token}`
  //       },
  //     });
  //     console.log(response.data);
  //     setLoading(false)
  //     setMessages(prevMessages => [...prevMessages, { text: response.data, role: 'bot' }]);
  //     NotificationManager.success('File uploaded successfully', 'Success');
  //     setFile(acceptedFiles[0]); // Set the uploaded file
  //   } catch (error:any) {
  //     if(error.response.status === 401) {
  //       NotificationManager.error('Unauthorized access, please login to continue')
  //       setLoading(false)
  //       setTimeout(() => {
  //         window.location.href = '/login'
  //       }, 3000)  
        
  //     } else {
  //       console.log('Error uploading file:', error);
  //     NotificationManager.error('Error uploading file. Please try again');
  //     setLoading(false)
  //     }
      
  //   }
  // }, []);

  const uploadFile = useCallback(async (acceptedFiles: any) => {
    setLoading(true);
    try {
      const newMessage: any = { id: Date.now(), text: '', role: 'bot' };
      await streamResponse(acceptedFiles[0], newMessage.id);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // setMessages(prevMessages => [
      //   ...prevMessages,
      //   { text: response.answer, role: 'bot', page: response.page } // Include the page number in the message
      // ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', role: 'bot' }]);
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
    <main className='h-screen flex'>
      <div className='flex flex-col mx-auto'>
        {!file && !loading && ( // Render dropzone only if no file is uploaded
          <div className='flex flex-col items-center w-full'>
            <Link href={'/'}><Image src='/logo-round.svg' height={90} width={90} alt='logo' className='mb-10 mt-16' /></Link>

            <div className="flex justify-center items-center gap-5 mb-7 mt-10">
              <Image src={'/Document.svg'} width={70} height={70} alt="youtube-logo" className="" />

              <h2 className="font-semibold text-xl">Lecture Notes / Text Assistance</h2>
            </div>

            <p className={`text-xl w-[587px] text-center text-gray-600`}>Upload a valid pdf to enjoy seamless interactions with books, papers, texts, lecture notes etc.</p>


            <label htmlFor="search" className="text-2xl my-6 mt-16 font-light">
              Upload PDF document:
            </label>

            <div {...getRootProps({ style })} className='cursor-pointer'>
              <input {...getInputProps()} />
              <p>Drag &apos;n&apos; drop your document here, or click to select document from your device</p>
            </div>
          </div>
        )}
      </div>

      {file && (
        <>
          <SlideViewer file={file} scrollToPage={handleScrollToPage} currentPage={currentPage} />
          <ChatArea messages={messages} setMessages={setMessages} scrollToPage={handleScrollToPage} />
        </>
      )}

      {loading && <Loader />}
    </main>
  )
}

export default SlidePage
