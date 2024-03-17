'use client'
import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import FlexDirection  from 'react-dropzone'
import SlideViewer from './components/SlideViewer'
import ChatArea from './components/ChatArea'

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
  const onDrop = useCallback((acceptedFiles:any) => {
    console.log(acceptedFiles)
  }, [])
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {
    'image/*': [],
  }});

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