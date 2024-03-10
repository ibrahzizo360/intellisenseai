import React, { useState, useRef, useEffect  } from 'react';
import ChatLoader from './loaders/ChatLoader';
import { api_url } from '@/utils';
import axios from 'axios';

interface ChatProps {
  transcript: string;
}

interface Message {
  text: string;
  user: 'user' | 'bot';
}

const ChatArea: React.FC<ChatProps> = ({transcript}) => {
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
  }, [messages]);

  const sendMessage = async () => {
    setMessages(prevMessages => [...prevMessages, { text: input, user: 'user' }]);
    setLoading(true);
    try {
      const response = await fetchMessage(input);
      setMessages(prevMessages => [...prevMessages, { text: response.text, user: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I am unable to process your request at the moment.', user: 'bot' }]);
    } finally {
      setLoading(false);
    }
    setInput('');
  };
  
  
  const fetchMessage = async (message: string): Promise<Message> => {
    setLoading(true);
    try {
      const response = await axios.post(`${api_url}/chat`, { question: message, transcript_text: transcript });
      if (response.status === 200) {
        return { text: response.data.chat_completion, user: 'bot' };
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
      const response = await axios.post(`${api_url}/summary`, { transcript_text: transcript });
      if (response.status === 200) {
        setMessages(prevMessages => [...prevMessages, { text: response.data.summary, user: 'bot' }]);
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

  return (
    <div className='lg:max-h-[92vh] bg-gray-800 rounded-md w-full'>
     <div className='h-[80%] overflow-y-auto no-scrollbar'>
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.user === 'user' ? '' : ''} text-white my-5 ml-1`} ref={chatContainerRef}>
          {message.user !== 'user' && <img src="bot.png" alt="User" className="w-7 h-7  mx-2" />}
          {message.user === 'user' && <img src="user.png" alt="User" className="w-7 h-7  mx-2" />}
          {message.text}
        </div>
      ))}
      {loading && <ChatLoader ref={loaderRef}/>} 
    </div>

      <hr className='my-1' />
      <div className='h-[20%] p-3'>
        <div className='border border-gray-200 rounded-md p-2 space-y-1'>
          <input
            type='text'
            className='w-full p-2 bg-gray-800 border-none focus:outline-none text-white'
            placeholder='Type a message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <button className='bg-gray-500 text-white rounded-md px-3 py-2 text-xs hover:bg-gray-300'>Quiz me</button>
              <button className='bg-gray-500 text-white rounded-md px-3 py-2 text-xs hover:bg-gray-300' onClick={getSummary}>Summarize</button>
            </div>
            <button className='bg-blue-500 text-white rounded-md px-3 py-2 text-xs' onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
