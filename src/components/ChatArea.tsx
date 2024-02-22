import React from 'react'

const ChatArea = () => {
  return (
    <div className='lg:max-h-[93vh] bg-gray-800 w-full rounded-md '>
        <div className='h-[80%] overflow-scroll no-scrollbar'></div>
        <hr className='my-1'/>
        <div className='h-[20%] p-3'>
            <div className='border border-gray-200 rounded-md p-2 space-y-1'>
            <input type="text" className="w-full p-2 bg-gray-800 border-none focus:outline-none text-white" placeholder="Type a message..."/>
            <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <button className="bg-gray-500 text-white rounded-md px-3 py-2 text-xs">Quiz me</button>
                <button className="bg-gray-500 text-white rounded-md px-3 py-2 text-xs">Summarize</button>
            </div>
            <button className="bg-blue-500 text-white rounded-md px-3 py-2 text-xs">Send</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ChatArea