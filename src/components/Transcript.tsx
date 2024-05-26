import React, { useEffect, useState, useRef } from 'react';

interface TranscriptProps {
  transcript: { word: string; start: number; end: number }[];
  currentTime: number;
  player: any;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, currentTime }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the index of the transcript item that corresponds to the current time
    const index = transcript.findIndex(
      item => item.start > currentTime
    );
    setActiveIndex(index);
  
    // Scroll to the active transcript item if containerRef is defined and index is valid
    setTimeout(() => {
      if (containerRef.current && index !== -1) {
        const activeElement = containerRef.current.children[index];
        activeElement.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }, 1); // Adjust the delay as needed
  }, [transcript, currentTime]);
  

  return (
    <div className="w-[580px] mt-3 p-3 h-[308px] overflow-y-scroll bg-[#dceeed] border border-gray-300 rounded-lg tracking-wider leading-10 no-scrollbar whitespace-normal " ref={containerRef}>
  {transcript.map((item, index) => (
    <div
      key={index}
      className={`py-1 text-sm mr-1 whitespace-normal inline-block ${
        index === activeIndex
          ? 'bg-[#afb9ec] rounded-xl'
          : ''
      }`}
    >
      {item.word}
    </div>
  ))}
</div>



  );
};

export default Transcript;
