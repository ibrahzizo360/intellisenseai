'use client'
import { postWithToken } from '@/utils'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Message } from '../page'
import ChatLoader from '@/components/loaders/ChatLoader'
import { FiSend } from 'react-icons/fi'
import Image from 'next/image'
import Latex from 'react-latex-next';

const ChatArea = ({ messages, setMessages,scrollToPage }: { messages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>, scrollToPage: any }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const loaderRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [lastMessageId, setLastMessageId] = useState<number | null>(null);




  const streamResponse = async (input: string, messageId: number) => {
    const url = `http://127.0.0.1:8000/v2/get_answers`;
    const res = await fetch(url,{
      body: JSON.stringify({ question: input }),
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
        let token = decoder.decode(result.value);
        // Update the message with the streamed data based on the message ID
        setMessages(prevMessages => prevMessages.map((message:any) => {
          if (message.id === messageId) {
            return { ...message, text: message.text + token, role: 'bot' };
          }
          return message;
        }));
        setLoading(false);
        return reader.read().then(processResult);
      });
    }
  }


  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    setMessages(prevMessages => [...prevMessages, { text: input, role: 'user' }]);
    setLoading(true);
    try {
      setInput('');
      const newMessage: any = { id: Date.now(), text: '', role: 'bot' };
      setLastMessageId(newMessage.id);
      await streamResponse(input, newMessage.id);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // setMessages(prevMessages => [
      //   ...prevMessages,
      //   { text: response.answer, role: 'bot', page: response.page } // Include the page number in the message
      // ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', role: 'bot' }]);
      setLoading(false);
    }
  }


  return (
    <div className='rounded-md w-1/2 border'>

      <header className='flex justify-between items-center px-2.5 font-semibold py-1'>
        <p>Tools</p>
        <Link href='/'>Go back Home</Link>
      </header>

      <div className='lg:h-[96vh] bg-[#dceeed] rounded-md w-full'>
        <div className='h-[85%] overflow-y-auto no-scrollbar'>
        {messages
      .filter((message) => message.text.length > 0)
        .map((message, index) => (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : ''} my-5 ml-1`} ref={chatContainerRef}>
          {message.role !== 'user' && <Image src="logo-round.svg" height={28} width={28} alt="User" className="w-7 h-7  mx-2" />}
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








