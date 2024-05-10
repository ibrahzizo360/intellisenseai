import React from 'react'
import DocumentViewer from '../components/DocumentViewer'
import ChatArea from '../components/ChatArea'

const DocumentPage = () => {
  return (
    <div className='flex w-full'>
      <DocumentViewer />
      <ChatArea />
    </div>
  )
}

export default DocumentPage