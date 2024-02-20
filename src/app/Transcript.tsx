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
    <div className="w-[800px] mt-20">
      {transcript.map((item, index) => (
        <span key={index} className={index === activeIndex ? 'bg-blue-200' : ''}>
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default Transcript;
