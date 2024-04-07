import Image from 'next/image'
import React from 'react'
import { Irish_Grover } from 'next/font/google';
import Link from 'next/link';

const irish = Irish_Grover({
    subsets: ["latin"],
    weight: "400",
    variable: "--irish-grover"
});


const Features = () => {
  return (
    <main className='mt-[88px] bg-[#235e5a]'>
        <div className="flex mx-auto w-[85%] justify-between py-16 gap-24">
            <div className="flex flex-col gap-5 leading-tight">
                 <h1 className="text-[64px] text-white font-bold">Explore a variety of advanced AI <span className='text-[#A43697]'>Features.</span></h1>  

                 <p className={` text-white text-lg`}>Transform your learning experience with our AI-powered tools. Easily upload a YouTube link or learning material for an immersive interactive session tailored just for you.</p>  

                 <Link href={'/'}><button className="bg-[#A43697] hover:bg-[#aa469e]  mt-6 px-10 py-5 text-xl rounded-xl text-white bg-opacity-80">Start for free</button></Link>
            </div>

            <div className="flex gap-10">
                <div className="flex flex-col">
                    <Image src={'/feat-1.svg'} height={390} width={283} alt="feature" />

                    <div className="flex p-4 items-center bg-white rounded-3xl mt-6 w-[283px] gap-3 text-center font-semibold">
                        <Image src={'/YouTube.svg'} height={78} width={78} alt="icon" />

                        <p className={`${irish.className}`}>Gain deeper insights from videos.</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse">
                    <Image src={'/feat-2.svg'} height={390} width={283} alt="feature" />

                    <div className="flex p-4 items-center bg-white rounded-3xl mb-6 w-[283px] gap-3 text-center font-semibold">
                        <Image src={'/Document.svg'} height={78} width={78} alt="icon" />

                        <p className={`${irish.className}`}>Uncover hidden and complex information within lecture notes.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Features