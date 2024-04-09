import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#5b3a57] text-white w-full p-2">
            <div className="mx-auto w-[80%] my-14">
                <div className="flex justify-between">
                    <div className='mt-24'>
                        <Image src={'/logo.svg'} height={140} width={140} alt="logo" />

                        <p className="mt-3">© Team BroCode. All rights reserved</p>

                        <div className='flex justify-evenly mt-16 items-center'>
                        
                            <Image src={'/whatsapp.png'} height={40} width={40} alt="whatsapp" />
                            <Image src={'/twitter.png'} height={40} width={40} alt="twitter" />
                            <Image src={'/tiktok.png'} height={40} width={40} alt="tiktok" />
                            <Image src={'/linkedin.png'} height={40} width={40} alt="linkedin" />
                     
                    </div>
                    </div>

                    <div className=''>
                        <p className='text-2xl'>Want to subscribe to our newsletters?</p>

                        <div className="flex items-center justify-between mt-4">
                            <input type='email' placeholder='Email' className='outline-none rounded-xl bg-white text-gray-700 px-4 py-2' />

                            <button className="bg-[#53DB13] px-6 py-3 rounded-xl text-white bg-opacity-80">Subscribe</button>
                        </div>

                        <div className='grid grid-cols-2 gap-5 mt-20 ml-40 gap-x-16'>
                            <Link href='/'><p>Features</p></Link>
                            <Link href='/'><p>About</p></Link>
                            <Link href='/'><p>Blog</p></Link>
                            <Link href='/'><p>Make donation</p></Link>
                            <Link href='/'><p>Contact Us</p></Link>
                            <Link href='/'><p>Powered by Openai</p></Link>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex justify-evenly gap-3 text-sm w-64 mx-auto mt-24 font-extralight'>
                <p>Term and conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>
        </footer>
    );
};

export default Footer;