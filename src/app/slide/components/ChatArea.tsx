'use client'
import { postWithToken } from '@/utils'
import Link from 'next/link'
import React,{useEffect, useRef, useState} from 'react'
import { Message } from '../page'
import ChatLoader from '@/components/loaders/ChatLoader'

const ChatArea = ({ messages , setMessages }: {messages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>}) => {
    console.log("messages", messages)
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const loaderRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container when messages change
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    
        if (loaderRef.current) {
          loaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, [messages,loading]);

    const getAnswer = async (message: string) => {
        const res = await postWithToken('get_answers', { question: message})
        console.log("res",res)
        return res.answer[0].text.value
    }

    const sendMessage = async () => {
        setMessages(prevMessages => [...prevMessages, { text: input, role: 'user' }]);
        setLoading(true);
        try {
          setInput('');
          const response = await getAnswer(input);
          setMessages(prevMessages => [...prevMessages, { text: response, role: 'bot' }]);
        } catch (error) {
          console.error('Error sending message:', error);
          setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', role: 'bot' }]);
        }finally {
            setLoading(false);
        }
    }

  return (
    <div className='rounded-md w-1/2 border'>
         
        <header className='flex justify-between items-center px-2.5 font-semibold py-1'>
            <p>Tools</p>
            <Link href='/'>Go back Home</Link>
        </header>

        <div className='flex-1 flex-col justify-between h-[90%] p-2.5'>
            
        <div className="h-[95%] p-3 flex flex-col space-y-4 text-sm tracking-wide overflow-y-scroll" ref={chatContainerRef}>
        {messages.length > 0 ? (
         messages.map((message:Message, idx:number) => (
        <div
            key={idx}
            className={`message ${message.role === 'bot' ? 'bg-slate-200' : 'bg-blue-500 text-white self-end'} p-3 rounded-md w-fit max-w-96`}
        >
            {message.text.split('\n').map((line:string, index:number) => (
                <React.Fragment key={index}>
                    {line} <br />
                </React.Fragment>
            ))}
        </div>
        ))
        ) : (<div></div>)}

        {loading && <ChatLoader ref={loaderRef}/>}


        </div>
            <div className='flex mt-7'>
                <input type="text" placeholder='Ask any question...' className='border border-blue-700 px-3 py-1.5 rounded-s-md
                outline-none w-full' onChange={(e) => setInput(e.target.value)} value={input} />
                <button className='bg-blue-700 px-3 py-1.5 rounded-e-md text-white
                hover:bg-blue-500' disabled={loading} onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>
  )
}

export default ChatArea