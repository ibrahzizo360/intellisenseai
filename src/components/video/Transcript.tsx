import React, { useEffect, useState, useRef } from 'react';

interface TranscriptProps {
  transcript: { text: string; start: number; end: number }[];
  currentTime: number;
  player: any;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, currentTime }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the index of the transcript item that corresponds to the current time
    // const index = transcript.findIndex(
    //   item => item.start > currentTime
    // );
    const index = transcript.findIndex(
      item => item.start <= currentTime && item.end >= currentTime
    );
    setActiveIndex(index);
  
    // Scroll to the active transcript item if containerRef is defined and index is valid
    if (containerRef.current && index !== -1) {
      requestAnimationFrame(() => {
        if(containerRef.current){
          const activeElement = containerRef.current.children[index];
          activeElement.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
      });
    } // Adjust the delay as needed
  }, [transcript, currentTime]);
  

  return (
    <div className="w-[580px] mt-3 ml-2 p-3 h-[308px] overflow-y-scroll bg-[#dceeed] border border-gray-300 rounded-lg leading-9 no-scrollbar " ref={containerRef}>
  {transcript.map((item, index) => (
    <span
      key={index}
      className={`py-1 px-1.5 text-sm whitespace-normal ${
        index === activeIndex
          ? 'bg-[#afb9ec] rounded-xl'
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
