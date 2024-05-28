import React, { useState, useRef, useEffect } from 'react';
import ChatLoader from '../loaders/ChatLoader';
import axios from 'axios';
import Axios from '@/utils/axios';
import { FiSend } from 'react-icons/fi';
import { Jura } from 'next/font/google';
import Image from 'next/image';

const jura = Jura({
  weight: "500",
  subsets: ["latin"],
}
)

interface ChatProps {
  transcript: string;
}

interface Message {
  text: string;
  user: 'user' | 'bot';
}

const ChatArea: React.FC<ChatProps> = ({ transcript }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, loading]);

  const sendMessage = async (e:any) => {
    setMessages(prevMessages => [...prevMessages, { text: input, user: 'user' }]);
    setLoading(true);
    setInput('');
    try {
      const response = await fetchMessage(input);
      setMessages(prevMessages => [...prevMessages, { text: response.text, user: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', user: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };


  const fetchMessage = async (message: string): Promise<Message> => {
    setLoading(true);
    try {
      const response = await Axios.post(`chat`, { question: message, transcript_text: transcript });
      if (response.status === 200) {
        console.log(response.data);
        return { text: response.data.chat_completion.content, user: 'bot' };
      } else {
        throw new Error('Invalid response status');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSummary = async () => {
    setLoading(true);
    try {
      const response = await Axios.post(`summary`, { transcript_text: transcript });
      console.log(response.data);
      if (response.status === 200) {
        setMessages(prevMessages => [...prevMessages, { text: response.data.summary.content, user: 'bot' }]);
      } else {
        throw new Error('Invalid response status');
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', user: 'bot' }]);
    } finally {
      setLoading(false);
    }
  }

  const getQuizzes = async () => {
    setLoading(true);
    try {
      const response = await Axios.post(`quiz`, { transcript_text: transcript });
      if (response.status === 200) {
        setMessages(prevMessages => [...prevMessages, { text: response.data.quiz.content, user: 'bot' }]);
      } else {
        throw new Error('Invalid response status');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', user: 'bot' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='lg:max-h-[85vh] bg-[#dceeed] rounded-md w-full'>
      <div className='h-[85%] overflow-y-auto no-scrollbar'>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.user === 'user' ? 'justify-end' : ''} my-5 ml-1`} ref={chatContainerRef}>
            {message.user !== 'user' && <Image src="logo-round.svg" height={28} width={28} alt="User" className="w-7 h-7  mx-2" />}
            {/* {message.user === 'user' && <img src="user.png" alt="User" className="w-7 h-7  mx-2" />} */}
            <div className={`max-w-[90%] bg-white p-2 rounded-b-lg  ${message.user === 'user' ? 'rounded-s-lg mr-3 ' : ' rounded-e-lg mt-4'}`}>
              {message.text.split('\n').map((line, index) => (
                <div key={index}>
                  {line === "%new%" ? <div className='my-2' /> : line}
                </div>
              ))}
            </div>
          </div>
        ))}
        {loading && <ChatLoader ref={loaderRef} />}
      </div>

      <div className='h-[15%] p-3'>
        <div className='h-[50px] bg-white rounded-full'>
          <form className='' onSubmit={(e) => { e.preventDefault(); sendMessage(e); }}>  
          <input
            type='text'
            className='w-[85%] ml-8 p-2 pb-2 bg-white border-none rounded-full focus:outline-none'
            placeholder='Type a message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className='flex justify-between items-center relative'>
            <div className='flex gap-2 items-center'>
              <div className={`bg-[#d9d9d9] cursor-pointer  rounded-full px-5 py-1 text-xs hover:bg-gray-300 absolute -bottom-5 left-36 ${jura.className}`} onClick={getQuizzes} >Quiz me</div>
              <div className={`bg-[#d9d9d9] cursor-pointer font-semibold  rounded-full px-5 py-1 text-xs hover:bg-gray-300 absolute -bottom-5 left-8 ${jura.className} `} onClick={getSummary}>Summarize</div>
            </div>
            <button className={`bg-gray-900 text-white rounded-full h-10 w-10 p-1.5 text-xs absolute -bottom-1 right-1 flex justify-center items-center cursor-pointer hover:bg-slate-700`} onSubmit={sendMessage} type='submit'>
              <FiSend className='h-5 w-5' />
            </button>

          </div>
          </form> 
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
