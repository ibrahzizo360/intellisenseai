import { IBM_Plex_Mono } from 'next/font/google';
import Link from 'next/link';
import React, { useEffect } from 'react'

const ibm_plex_mono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: "300",
    variable: "--ibm-plex-mono"
});

const Header = () => {
    const words = ["Learning", "Studying", "Research"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;

    function type() {
        currentWord = words[i];
        if (isDeleting) {
          if (typeof document !== 'undefined') {
            const element = document.getElementById("typewriter");
            if (element) {
              element.textContent = currentWord.substring(0, j + 1);
            } else {
              console.error("Element with ID 'typewriter' not found");
            }
          }
          j--;
          if (j === 0) {
            isDeleting = false;
            i++;
            if (i === words.length) {
              i = 0;
            }
          }
        } else {
          if (typeof document !== 'undefined') {
            const element = document.getElementById("typewriter");
            if (element) {
              element.textContent = currentWord.substring(0, j + 1);
            } else {
              console.error("Element with ID 'typewriter' not found");
            }
          }
          j++;
          if (j === currentWord.length) {
            isDeleting = true;
          }
        }
        setTimeout(type, 250);
      }

    useEffect(() => {  
        type(); 
      }, []);

  return (
        <header className="flex items-center justify-center h-[720px] w-screen flex-col bg-[url('/header.svg')] bg-cover bg-no-repeat">
          <h2 className="text-[70px] font-bold text-center text-white mx-auto w-[80%]">
            Enter the future of <span id='typewriter' className="text-purple-500"></span>
          </h2>

          <p className={`text-center text-lg mt-4 text-white mx-auto w-[60%] ${ibm_plex_mono.className}`}>
          KnowtifAI propels education into the digital age, offering users an innovative platform to engage with video content and learning materials seamlessly.
          </p>

          <Link href="/signup">
            <button className="bg-[#53DB13] px-6 py-3 rounded-md mt-8 text-white bg-opacity-80">
              Get Started
            </button>
          </Link> 
        </header>
  )
}

export default Header