'use client'
import React, { useEffect, useState } from 'react';

interface TranscriptProps {
  transcript: { text: string; start: number; duration: number }[];
  currentTime: number;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, currentTime }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const index = transcript.findIndex(
      item => currentTime >= item.start && currentTime <= item.start + item.duration
    );
    setActiveIndex(index);
  }, [transcript, currentTime]);

  return (
    <div className="w-[640px] mt-5 p-3 h-72 overflow-scroll bg-gray-50 border border-gray-300 rounded-lg tracking-wider leading-10">
      {transcript.map((item, index) => (
        <span
        key={index}
        className={`py-2 text-sm mr-1 ${
          index === activeIndex
            ? 'bg-blue-200 rounded-md animate-slideIn'
            : ''
        }`}
      >
        {item.text}
      </span>
      
      ))}
    </div>
  );
};

export default Transcript;
