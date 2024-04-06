import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#5b3a57] text-white py-5 w-full">
            <div className="mx-auto w-[80%]">
                <div className="flex justify-between">
                    <div>
                        <Image src={'/logo.svg'} height={140} width={140} alt="logo" />

                        <p className="mt-3">© Team BroCode. All rights reserved</p>
                    </div>

                    <div className=''>
                        <p className='text-2xl'>Want to subscribe to our newsletters?</p>

                        <div className="flex items-center justify-between mt-4">
                            <input type='email' placeholder='Email' className='outline-none rounded-xl bg-white text-gray-700 px-4 py-2' />

                            <button className="bg-[#53DB13] px-6 py-3 rounded-xl text-white bg-opacity-80">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;