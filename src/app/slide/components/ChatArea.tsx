import React from 'react'

const ChatArea = () => {
  return (
    <div className='h-full p-5 rounded-md w-1/2 border'>
        <header className='flex justify-between items-center'>
            <p>Chat</p>
            <div>Tools</div>
        </header>
        <div>
            <div className="w-full"></div>
            <div>
                <input type="text" />
                <button></button>
            </div>
        </div>
    </div>
  )
}

export default ChatArea