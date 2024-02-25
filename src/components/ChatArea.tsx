import React, { useState } from 'react';

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

  const sendMessage = async () => {
    setMessages([...messages, { text: input, user: 'user' }]);
    const response = await fetchMessage(input); // Assuming fetchMessage function is defined elsewhere
    setMessages([...messages, { text: response, user: 'bot' }]);
    setInput('');
  };

  const fetchMessage = async (message: string): Promise<string> => {
    // Your fetch logic here
    return 'Sample response'; // Replace with actual fetch logic
  };

  return (
    <div className='lg:max-h-[93vh] bg-gray-800 w-full rounded-md'>
      <div className='h-[80%] overflow-scroll no-scrollbar'>
        {/* Render messages */}
        {messages.map((message, index) => (
          <div key={index} className={`text-${message.user === 'user' ? 'right' : 'left'}`}>
            {message.text}
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
