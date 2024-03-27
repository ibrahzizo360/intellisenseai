'use client'
import React, {useCallback, useMemo, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import SlideViewer from './components/SlideViewer'
import ChatArea from './components/ChatArea'
import Axios from '@/utils/Axios'
import { NotificationManager } from 'react-notifications'
import { acceptStyle, focusedStyle, rejectStyle, baseStyle } from './utils'
import { Progress } from "@/components/ui/progress"
import Loader from '@/components/loaders/Loader'

export interface Message {
  text: string;
  role: 'user' | 'bot';
}

const SlidePage = () => {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false)
  console.log(file)

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {
    'application/msword': ['.docx','.doc'],
    'application/pdf': ['.pdf'],
    'application/vnd.ms-powerpoint': ['.ppt']
  }});

  const uploadFile = useCallback(async (acceptedFiles:any) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    const token = localStorage.getItem('access_token')
  
    try {
      setLoading(true)
      const response = await Axios.post('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      console.log(response.data);
      setLoading(false)
      setMessages(prevMessages => [...prevMessages, { text: response.data.message[0].text.value, role: 'bot' }]);
      NotificationManager.success('File uploaded successfully', 'Success');
      setFile(acceptedFiles[0]); // Set the uploaded file
    } catch (error) {
      console.log('Error uploading file:', error);
      NotificationManager.error('Error uploading file')
      setLoading(false)
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
      <div className='flex justify-center items-center mx-auto'>
        {!file && !loading && ( // Render dropzone only if no file is uploaded
          <div {...getRootProps({style})} className='cursor-pointer'>
            <input {...getInputProps()} />
            <p>Drag &apos;n&apos; drop your document here, or click to select document from your device</p>
          </div>
        )}
      </div>
      
      {file && (
        <>
          <SlideViewer file={file} />
          <ChatArea messages={messages} setMessages={setMessages} />
        </>
      )}

      {loading && <Loader/>}
    </main>
  )
}

export default SlidePage
