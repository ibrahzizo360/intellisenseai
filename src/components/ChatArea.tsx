import React, { useState, useRef, useEffect  } from 'react';
import ChatLoader from './loaders/ChatLoader';

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

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const sendMessage = async () => {
    setMessages(prevMessages => [...prevMessages, { text: input, user: 'user' }]);
    const response = await fetchMessage(input); // Assuming fetchMessage function is defined elsewhere
    setMessages(prevMessages => [...prevMessages, { text: response, user: 'bot' }]);
    setInput('');
  };
  
  console.log('messages', messages)
  console.log('input', input)

  const fetchMessage = async (message: string): Promise<string> => {
  //   return 'In the heart of a bustling city, where skyscrapers kiss the clouds and the streets hum with the rhythm of life, there lies a hidden sanctuary. Its a place where time slows down, and the air is filled with the scent of jasmine and freshly brewed coffee. Here, amidst the chaos, one can find solace in the embrace of a good book or the melody of a street musicians guitar. Its a haven for dreamers, thinkers, and wanderers alike, where every corner tells a story, and every whisper holds a secret. Welcome to the city soul, where magic awaits around every corner';
    return `1. What is the capital of France?
    a) Paris
    b) London
    c) Rome
    d) Berlin`
};

  return (
    <div className='lg:max-h-[92vh] bg-gray-800 rounded-md w-full'>
      <div className='h-[80%] overflow-y-auto no-scrollbar'>
        {messages.map((message, index) => (
        <div key={index} className={`flex ${message.user === 'user' ? '' : ''} text-white my-5 ml-1`} ref={chatContainerRef}>
          {message.user !== 'user' && <img src="bot.png" alt="User" className="w-7 h-7  mx-2" />}
          {message.user === 'user' && <img src="user.png" alt="User" className="w-7 h-7  mx-2" />}
          {message.text}
          {loading && <ChatLoader />}
        </div>
        ))}
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
              <button className='bg-gray-500 text-white rounded-md px-3 py-2 text-xs'>Quiz me</button>
              <button className='bg-gray-500 text-white rounded-md px-3 py-2 text-xs'>Summarize</button>
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
