'use client'
import { fetchWithToken, getUser } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

const Nav = () => {
  const path = usePathname();
  const user = getUser();
  const [openFeatures, setOpenFeatures] = useState(false);

  return (
    <nav className="justify-between items-center w-full flex bg-[#155552] py-5 px-28 text-white fixed top-0 bg-opacity-90 z-50">
      <Link href='/'>
        <Image
          src="/logo.svg"
          alt="logo"
          width={140}
          height={140}
          className=""
        /> 
      </Link>

        <div className='flex gap-16 items-center relative'>
            
              <div className="flex items-center gap-2">
              <Link href='/features'>
              <h2 className={`text-sm font-semibold cursor-pointer hover:text-green-400 ${path === '/features' ? 'border-b-2' : ''}`}>Features</h2>
              </Link>
              <IoMdArrowDropdown className='mt-0.5 h-6 w-6 cursor-pointer' onClick={() => setOpenFeatures(!openFeatures)} />
              </div>

              {
                openFeatures && (
                  <div className="absolute bg-white rounded-lg top-12 left-5">
                  <Link href='/video'>
                    <div className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                      <Image src={'YouTube.svg'} alt='' height={20} width={20} />
                      <p className='text-black text-center'>Video Interaction</p>
                    </div>
                  </Link>
                    <hr />
                  <Link href='/slide'>
                    <div className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-200">
                      <Image src={'Document.svg'} alt='' height={20} width={20} />
                      <p className='text-black'>Document Interaction</p>
                    </div>
                  </Link>
                  </div>
                )
              }


              
              
            <Link href='/more'><h2 className={`text-sm font-semibold cursor-pointer hover:text-green-400 ${path === '/more' ? 'border-b-2' : ''}`}>Blog</h2></Link>
            <Link href='/about'><h2 className={`text-sm font-semibold cursor-pointer hover:text-green-400 ${path === '/about' ? 'border-b-2' : ''}`}>About</h2></Link>
            {!user && <Link href='/login'><h2 className={`text-sm font-semibold cursor-pointer hover:text-green-400 ${path === '/login' ? 'underline' : ''}`}>Sign In</h2></Link>}
            {!user ? <Link href='/register'><button className="bg-[#53DB13] px-6 py-3 rounded-md bg-opacity-75 hover:bg-[#84d160]">Get Started</button></Link> : <Link href='/login'><button className="bg-[#53DB13] px-6 py-3 rounded-md bg-opacity-75 hover:bg-[#84d160]">Logout</button></Link>   }    
        </div>
    </nav>
  )
}

export default Nav
