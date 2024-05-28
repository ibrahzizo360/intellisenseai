'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import ChatLoader from '@/components/loaders/ChatLoader'
import { FiSend } from 'react-icons/fi'
import Image from 'next/image'
import Latex from 'react-latex-next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMessages } from '@/store/chat-slice';
import { store } from '@/store/store'
import { Message } from '@/types/message'

const ChatArea = ({session_id}: {session_id?: string}) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const loaderRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messages = useSelector((state: any) => state.session.messages);
  const dispatch = useDispatch();

  const scrollToPage = (pageNumber?: number) => {
    console.log('scrolling to page:', pageNumber);
  }

  const streamResponse = async (input: string, messageId: number) => {
    const base_url = process.env.NEXT_PUBLIC_API_URL; 
    const url = `${base_url}v2/get_answers`;

    try {
    const res = await fetch(url,{
      body: JSON.stringify({ question: input, session_id: session_id }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      } 
    });

    if (res.body) {
      var reader = res.body.getReader();
      var decoder = new TextDecoder('utf-8');
      reader.read().then(function processResult(result: any): any {
        if (result.done) return;
        const decoded = decoder.decode(result.value);
        const text_match = decoded.match(/'text':\s*'([^']+)'/);
        const page_match = decoded.match(/'page':\s*'([^']+)'/);
        if (text_match) {
          let token = text_match[1];
          const currentMessages = store.getState().session.messages;

          const updatedMessages = currentMessages.map((message: Message) => {
            if (message.id === messageId) {
                return { ...message, text: message.text + token, role: 'bot' };
            }
            return message;
          });
          dispatch(setMessages(updatedMessages));
        } 
        
        setLoading(false);
        return reader.read().then(processResult);
      });
    }
      } catch (error) {
        console.log('error', error);
    }
  }


  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const currentMessages = store.getState().session.messages;
    if (!input) return;
    const updatedMessages = [...currentMessages, { text: input, role: 'user' }];
    dispatch(setMessages(updatedMessages));
    setLoading(true);
    try {
      setInput('');
      const newMessage: any = { id: Date.now(), text: '', role: 'bot' };
      const currentMessages = store.getState().session.messages;
      const updatedMessages = [...currentMessages, newMessage];
      dispatch(setMessages(updatedMessages));
      await streamResponse(input, newMessage.id);
    } catch (error) {
      console.error('Error sending message:', error);
      dispatch(setMessages((prevMessages: any) => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', role: 'bot' }]));
      setLoading(false);
    }
  }


  return (
    <div className='border flex-1'>

      <header className='flex justify-between items-center px-2.5 font-semibold py-1'>
        <p>Tools</p>
        <Link href='/'>Go back Home</Link>
      </header>

      <div className='lg:h-[96vh] bg-[#dceeed] rounded-md w-full'>
        <div className='h-[85%] overflow-y-auto no-scrollbar'>
        {messages
      .filter((message: any) => message.text.length > 0)
        .map((message :any , index : any) => (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : ''} my-5 ml-1`} ref={chatContainerRef}>
          {message.role !== 'user' && <Image src="/logo-round.svg" height={28} width={28} alt="User" className="w-7 h-7  mx-2" />}
          <div className={`max-w-[90%] bg-white p-2 rounded-b-lg  ${message.role === 'user' ? 'rounded-s-lg mr-3 ' : ' rounded-e-lg mt-4'}`}>
            <div className="flex items-end"> {/* Flex container for message text and page number */}
            {message.text && <Latex>{message.text.replace(/\n/g, '<br />')}</Latex>}
              {/* Display page number if available */}
              {message.role === 'bot' && message.page && <div className='bg-slate-500 text-white min-w-5 rounded-full 
              p-0.5 text-xs ml-2 flex items-center justify-center cursor-pointer hover:bg-slate-400'
              onClick={() => scrollToPage(message.page)}
              >{message.page}</div>}
            </div>
          </div>
        </div>
      ))}

        {loading && <ChatLoader ref={loaderRef} />}
        </div>

        <div className='h-[15%] p-3'>
          <div className='h-[50px] bg-white rounded-full'>
            <form className='' onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <input
                type='text'
                className='w-[85%] ml-8 p-2 mt-1 bg-white border-none rounded-full focus:outline-none'
                placeholder='Type a message...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className='flex justify-between items-center relative'>
                {/* <div className='flex gap-2 items-center'>
              <div className={`bg-[#d9d9d9] cursor-pointer  rounded-full px-5 py-1 text-xs hover:bg-gray-300 absolute -bottom-5 left-36 ${jura.className}`} onClick={getQuizzes} >Quiz me</div>
              <div className={`bg-[#d9d9d9] cursor-pointer font-semibold  rounded-full px-5 py-1 text-xs hover:bg-gray-300 absolute -bottom-5 left-8 ${jura.className} `} onClick={getSummary}>Summarize</div>
            </div> */}
                <button className={`bg-gray-900 text-white rounded-full h-10 w-10 p-1.5 text-xs absolute bottom-0 right-1 flex justify-center items-center cursor-pointer hover:bg-slate-700`} onSubmit={sendMessage} type='submit'>
                  <FiSend className='h-5 w-5' />
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatArea








