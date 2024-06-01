import Image from 'next/image'
import React from 'react'
import { Irish_Grover, Livvic } from 'next/font/google';
import Link from 'next/link';

const irish = Irish_Grover({
    subsets: ["latin"],
    weight: "400",
    variable: "--irish-grover"
});

const livvic = Livvic({
    subsets: ["latin"],
    weight: "400",
    variable: "--livvic"
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

                        <div className="flex p-4 items-center bg-white rounded-3xl mt-6 lg:w-[283px] gap-3 text-center font-semibold">
                            <Image src={'/YouTube.svg'} height={78} width={78} alt="icon" />

                            <p className={`${irish.className}`}>Gain deeper insights from videos.</p>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse">
                        <Image src={'/feat-2.svg'} height={390} width={283} alt="feature" />

                        <div className="flex p-4 items-center bg-white rounded-3xl mb-6  w-[283px] gap-3 text-center font-semibold">
                            <Image src={'/Document.svg'} height={78} width={78} alt="icon" />

                            <p className={`${irish.className}`}>Uncover hidden and complex information within lecture notes.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 px-5 bg-[#dbeeed]">
                <div className="mx-auto w-4/5 flex justify-between flex-col lg:flex-row gap-12 lg:gap-0">
                    <div className="rounded-md">
                        <Image src={'/youtube-feat.svg'} height={325} width={407} alt="feature" />
                        <div className="bg-white w-[407px] p-7 flex flex-col relative">
                            <div className="absolute rounded-full py-1 px-5 text-white -top-3 right-16 bg-gradient-to-r from-[#39CA9E] from-5% to-[#EB45DA] to-70%">
                                Free
                            </div>
                            <div className="flex">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Video Interactivity</h2>
                                    <p className={`text-gray-600 ${livvic.className}`}>Please provide a valid YouTube link to experience uninterrupted engagement with video content.</p>
                                </div>

                                <Image src={'/YouTube.svg'} height={50} width={50} alt="icon" />

                            </div>

                            <div className='flex items-center justify-center py-3 border border-red-600 rounded-full w-2/3 text-red-600 cursor-pointer mx-auto hover:bg-red-600 hover:text-white mt-9'>
                                <Link href={'/media'}><p className='font-bold '>Use this feature</p></Link>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md">
                        <Image src={'/doc-feat.svg'} height={325} width={407} alt="feature" />
                        <div className="bg-white w-[407px] p-7 flex flex-col relative">
                            <div className="absolute rounded-full py-1 px-5 text-white -top-3 right-16 bg-gradient-to-r from-[#39CA9E] from-5% to-[#EB45DA] to-70%">
                                Free
                            </div>
                            <div className="flex">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Document Interactivity</h2>
                                    <p className={`text-gray-600 ${livvic.className}`}>You can upload a PDF file to use the system&apos;s features for reading and interacting with documents like books, articles, and notes.</p>
                                </div>

                                <Image src={'/Document.svg'} height={50} width={50} alt="icon" />

                            </div>

                            <div className='flex items-center justify-center py-3 border border-red-600 rounded-full w-2/3 text-red-600 cursor-pointer mx-auto hover:bg-red-600 hover:text-white mt-3'>
                                <Link href={'/document'}><p className='font-bold '>Use this feature</p></Link>
                            </div>
                        </div>
                    </div>

                </div>

                <h2 className='font-bold text-2xl my-24 w-4/5 mx-auto'>Upcoming Features</h2>

                <div className="mx-auto w-4/5 flex justify-between">
                    <div className="rounded-md">
                        <Image src={'/learning-feat.svg'} height={325} width={407} alt="feature" />
                        <div className="bg-white w-[407px] p-7 flex flex-col relative">
                            <div className="absolute rounded-full py-1 px-5 text-white -top-3 right-16 bg-gradient-to-r from-[#3959CA] from-5% to-[#4AA93A] to-70%">
                                Premium
                            </div>
                            <div className="flex">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Collaborative Learning Hub</h2>
                                    <p className={`text-gray-600 ${livvic.className}`}>A dynamic feature designed to facilitate group study sessions, whether on a global or local scale, and offering both public and private options.</p>
                                </div>

                                {/* <Image src={'/Quiz.svg'} height={50} width={50} alt="icon" /> */}

                            </div>

                            <div className='flex items-center justify-center py-3 border border-gray-600 rounded-full w-2/3 text-gray-600 mx-auto mt-6'>
                                <p className='font-bold '>Unavailable</p>
                            </div>
                        </div>
                    </div>

                    </div>
                       
            </div>
        </main>
    )
}

export default Features