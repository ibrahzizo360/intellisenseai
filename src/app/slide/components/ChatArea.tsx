import React from 'react'

const ChatArea = () => {
  return (
    <div className='rounded-md w-1/2 border my-0'>
        
        <header className='flex justify-between items-center'>
            <p>Chat</p>
            <div>Tools</div>
        </header>

        <div className='p-2 flex-1 flex-col justify-between h-full'>
            
            <div className="flex justify-center items-center bg-slate-200 h-[80%]">
                <p className="">Chat Area</p>
            </div>

            <div className='flex'>
                <input type="text" placeholder='Ask any question...' className='border border-blue-700 px-3 py-1.5 rounded-s-md
                outline-none w-full' />
                <button className='bg-blue-700 px-3 py-1.5 rounded-e-md text-white'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default ChatArea