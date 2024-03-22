'use client'
import React, {useCallback, useMemo, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import FlexDirection  from 'react-dropzone'
import SlideViewer from './components/SlideViewer'
import ChatArea from './components/ChatArea'
import axios from 'axios'
import Axios from '@/utils/axios'

const baseStyle = {
  flex: 1,
  display: 'flex',

  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


const SlidePage = () => {

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
    console.log(token)
  
    try {
      const response = await Axios.post('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error uploading file:', error);
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
        <div {...getRootProps({style})} className='cursor-pointer'>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
      
      {/* <SlideViewer />
      <ChatArea /> */}
    </main>
  )
}

export default SlidePage