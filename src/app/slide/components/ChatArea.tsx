'use client'
import Link from 'next/link'
import React,{useState} from 'react'

const ChatArea = ({ messages = [], setMessages }: any) => {
    console.log("messages", messages)
    const obj = localStorage.getItem('userData')
    console.log(obj)

  return (
    <div className='rounded-md w-1/2 border'>
         
        <header className='flex justify-between items-center px-2.5 font-semibold py-1'>
            <p>Tools</p>
            <Link href='/'>Go back Home</Link>
        </header>

        <div className='flex-1 flex-col justify-between h-[90%] p-2.5'>
            
        <div className="h-[95%] p-3 flex flex-col space-y-4 text-sm tracking-wide overflow-y-scroll">
        {messages.length > 0 ? (
    messages.map((message:any, idx:any) => (
        <div
            key={idx}
            className={`message ${message.role === 'bot' ? 'bg-slate-200' : 'bg-blue-500 text-white self-end'} p-3 rounded-md w-fit max-w-96`}
        >
            {message.text.split('\n').map((line:any, index:any) => (
                <React.Fragment key={index}>
                    {line} <br />
                </React.Fragment>
            ))}
        </div>
    ))
) : (
    <div></div>
)}

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