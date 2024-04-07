'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Nav = () => {
  const path = usePathname();
  
  return (
    <nav className="justify-between items-center w-full flex bg-[#155552] py-5 px-28 text-white fixed top-0 bg-opacity-90 z-50">
        <Image
          src="/logo.svg"
          alt="logo"
          width={140}
          height={140}
          className=""
        />  

        <div className='flex gap-16 items-center'>
            <Link href='/features'><h2 className={`text-sm font-semibold cursor-pointer hover:text-green-400 ${path === '/features' ? 'border-b-2' : ''}`}>Features</h2></Link>
            <Link href='/login'><h2 className={`text-sm font-semibold cursor-pointer hover:text-green-400 ${path === '/login' ? 'underline' : ''}`}>Sign In</h2></Link>
            <Link href='/about'><h2 className={`text-sm font-semibold cursor-pointer hover:text-green-400 ${path === '/about' ? 'underline' : ''}`}>About</h2></Link>
            <Link href='/register'><button className="bg-[#53DB13] px-6 py-3 rounded-md bg-opacity-75 hover:bg-[#84d160]">Get Started</button></Link>      
        </div>
    </nav>
  )
}

export default Nav
