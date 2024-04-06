import Image from 'next/image'
import React from 'react'

const Nav = () => {
  return (
    <nav className="justify-between items-center w-full flex bg-[#155552] py-5 px-28 text-white fixed top-0 bg-opacity-90">
        <Image
          src="/logo.svg"
          alt="logo"
          width={140}
          height={140}
          className=""
        />  

        <div className='flex gap-16 items-center'>
            <h2 className="text-sm font-semibold">Features</h2>
            <h2 className="text-sm font-semibold">Sign In</h2>
            <h2 className="text-sm font-semibold">About</h2>
            <button className="bg-[#53DB13] px-6 py-3 rounded-md bg-opacity-75">Get Started</button>       
        </div>
    </nav>
  )
}

export default Nav