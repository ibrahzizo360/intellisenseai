import React, { useEffect, useState, useRef } from 'react';

interface TranscriptProps {
  transcript: { text: string; start: number; duration: number }[];
  currentTime: number;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, currentTime }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the index of the transcript item that corresponds to the current time
    const index = transcript.findIndex(
      item => currentTime >= item.start && currentTime <= item.start + item.duration
    );
    setActiveIndex(index);
    
    // Scroll to the active transcript item if containerRef is defined and index is valid
    if (containerRef.current && index !== -1) {
      const activeElement = containerRef.current.children[index];
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [transcript, currentTime]);

  return (
    <div className="w-[640px] mt-5 p-3 h-72 overflow-scroll bg-gray-50 border border-gray-300 rounded-lg tracking-wider leading-10 no-scrollbar" ref={containerRef}>
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
