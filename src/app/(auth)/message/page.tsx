import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Jura } from 'next/font/google';

const jura = Jura({
    subsets: ["latin"],
    weight: "400",
    variable: "--jura"
});

const MessagePage = () => {
  return (
    <div className={`bg-[url('/message.svg')] bg-center bg-no-repeat w-screen h-screen ${jura.className}`}>
        <div className="flex flex-col items-center justify-center h-full">
        <Link href={'/'}><Image src='/logo-round.svg' height={60} width={60} alt='logo' className='' /></Link>
            <div className=" text-4xl font-bold mt-9 mb-5">Let&apos; s Talk</div>

            <div className="flex w-1/2 gap-5">
                <input className="px-12 py-4 rounded-3xl bg-[#E8E9EB]  outline-none border border-gray-800 w-full" placeholder="Your Name" type='text' />   
                <input className="px-12 py-4 rounded-3xl bg-transparent  outline-none border border-gray-800 w-full" placeholder="Email address" type='email' />
            </div>

            <textarea name="" id="" className='w-1/2 rounded-2xl py-3 px-6 border-gray-800 border my-6 bg-transparent outline-none' rows={10} placeholder='Your message'></textarea>


            <div className="flex justify-between text-center w-1/2">
                <div className="flex items-center">
                    <input type="checkbox" name="" id="" className='mr-2 ' style={{accentColor:'#d846ef'}}/>
                    <label htmlFor="">Send me a copy</label>
                </div>

                <button className="bg-[#d846ef] text-white rounded-full px-9 p-1.5 flex justify-center items-center cursor-pointer hover:bg-fuchsia-700">
                    Send a message
                </button>
            </div>

            <div className="flex items-center w-1/2 my-5">
                <hr className='w-full border-1 border-gray-800'/>
                <p className='mx-2 uppercase w-80 text-center'>or call us</p>
                <hr className='w-full border-1 border-gray-800'/>
            </div>

            <p className=" text-center">+233550371895</p>

            <div className='flex justify-evenly mt-7 items-center gap-10 ml-[28rem]'>
                        
                            <Image src={'/whatsapp.png'} height={40} width={40} alt="whatsapp" />
                            <Image src={'/twitter.png'} height={40} width={40} alt="twitter" />
                            <Image src={'/tiktok.png'} height={40} width={40} alt="tiktok" />
                            <Image src={'/linkedin.png'} height={40} width={40} alt="linkedin" />
                     
            </div>
        </div>
    </div>
  )
}

export default MessagePage