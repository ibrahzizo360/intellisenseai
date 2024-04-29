'use client'
import React, { useState, useEffect } from 'react';

function App() {
  const [responseChunks, setResponseChunks] = useState<string[]>([]);

  useEffect(() => {
    const query = "What is regularization in machine learning? How does it work? What are the different types of regularization techniques?";
    const url = `http://127.0.0.1:8000/query-stream/?query=${encodeURIComponent(query)}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: 'GET', credentials: 'same-origin' });


        if(response.body){
            const reader = response.body.getReader();
            const chunks = [];
    
            while (true) {
              const { done, value } = await reader.read();
    
              if (done) {
                break;
              }
    
              chunks.push(value);
            }
    
            const decodedChunks = chunks.map(chunk => new TextDecoder().decode(chunk));
            setResponseChunks(decodedChunks);

        }

    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => setResponseChunks([]);
  }, []);

  return (
    <div className='w-screen h-screen flex justify-center items-center '>
        <div>
      <h1>Streaming Response</h1>
      <div>
        {responseChunks.map((chunk, index) => (
          <p key={index}>{chunk}</p>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
