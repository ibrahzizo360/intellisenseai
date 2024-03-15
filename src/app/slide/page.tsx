import React from 'react'
import SlideViewer from './components/SlideViewer'
import ChatArea from './components/ChatArea'


const SlidePage = () => {
  return (
    <main className='h-screen flex '>
      <SlideViewer />
      <ChatArea />
    </main>
  )
}

export default SlidePage