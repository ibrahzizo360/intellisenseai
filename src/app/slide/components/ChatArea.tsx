import React from 'react'

const ChatArea = () => {
  return (
    <div className='rounded-md w-1/2 border'>
         
        <header className='flex justify-between items-center px-2.5 font-semibold py-1'>
            <p>Chat</p>
            <div>Tools</div>
        </header>

        <div className='flex-1 flex-col justify-between h-[90%] p-2.5'>
            
            <div className="flex justify-center items-center bg-slate-200 h-[95%]">
                <p className="">Chat Area</p>
            </div>

            <div className='flex mt-7'>
                <input type="text" placeholder='Ask any question...' className='border border-blue-700 px-3 py-1.5 rounded-s-md
                outline-none w-full' />
                <button className='bg-blue-700 px-3 py-1.5 rounded-e-md text-white
                hover:bg-blue-500'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default ChatArea