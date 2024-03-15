import React from 'react'

const ChatArea = () => {
  return (
    <div className='h-full p-5 rounded-md w-1/2 border'>
        <header className='flex justify-between items-center'>
            <p>Chat</p>
            <div>Tools</div>
        </header>
        <div className='p-5 w-full flex flex-col'>
            <div className="w-full">
                <p className="flex">Chat Area</p>
            </div>
            <div className='flex w-full'>
                <input type="text" placeholder='Ask any question...' className='border border-blue-700 px-3 py-1.5 rounded-s-md
                outline-none' />
                <button className='bg-blue-700 px-3 py-1.5 rounded-e-md text-white'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default ChatArea