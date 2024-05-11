'use client'
import { fetchWithToken, getUser } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { GrAnalytics } from 'react-icons/gr'
import { IoMdExit } from 'react-icons/io'
import { IoCloudUploadOutline, IoSettingsOutline } from 'react-icons/io5'
import { LiaUserCircleSolid } from 'react-icons/lia';
import { MdContentPasteSearch } from 'react-icons/md';

const Sidebar = () => {
  const username = getUser()

  const chats = [
    {
      name: 'Machine Learning'
    }
  ]
  return (
    <div className='h-screen w-[350px] bg-[#DCEEED]'>
      <Image src={'sidebar-logo.svg'} alt='logo' height={39} width={154} className='p-2' />

      <Link href='/document'>  
      <div className='w-4/5 mx-auto mt-4 text-white'>
          <input type="file" name="" id="" className='hidden' />
          <div className="flex justify-between px-6 items-center bg-[#b945ab] rounded-md cursor-pointer">
            <IoCloudUploadOutline className='h-5 w-5' />
            <h3 className=' py-2 px-4 font-medium text-sm'>Upload document</h3>
          </div>
        </div>
      </Link>
     

      <Link href='/media'>
        <div className='w-4/5 mx-auto mt-4 text-white'>
          <input type="file" name="" id="" className='hidden' />
          <div className="flex justify-between gap-0 px-6 items-center bg-[#b945ab] rounded-md cursor-pointer">
            <MdContentPasteSearch className='h-5 w-5' />
            <h3 className=' py-2 px-4 pr-8 font-medium text-center text-sm'>Paste video url</h3>
          </div>
        </div>
      </Link>

        <div className='w-full mt-5 mb-3 border-b border-gray-300' />

       <h3 className='px-8 text-lg font-medium mb-2'>Interactions history</h3>

        <div className="h-72 overflow-y-scroll">
       {
        chats.map((chat: any) => (
          <div className="flex items-center mx-8 gap-4 bg-[#5A5FD1] px-3 py-1 rounded-md text-white cursor-pointer" key={chat.name}>
            <BsChatDots />
            <p>{chat.name}</p>
          </div>
        ))
       }
       </div>

       <div className='w-full mt-5 mb-5 border-b border-gray-300' />

       <div className="flex items-center mx-10 gap-7 cursor-pointer mb-4">
       <GrAnalytics className='h-7 w-7' />
        <p className='text-xl'>Analytics</p>
       </div>

       <div className="flex items-center mx-10 gap-7 cursor-pointer mb-4">
       <IoSettingsOutline className='h-7 w-7' />
        <p className='text-xl'>Settings</p>
       </div>


       <div className="mx-10 mt-20 flex-col flex">
       <div className="flex items-center gap-3 cursor-pointer mx-auto mb-2">
       <LiaUserCircleSolid className='h-6 w-6' />
        <p className='text-md'>{username}</p>
       </div>

       <div className="flex items-center gap-7 cursor-pointer  bg-white px-3 py-1 rounded-full justify-center">
        <IoMdExit className='h-5 w-5' />
        <p className='text-md'>Log Out</p>
       </div>
       </div>

    </div>
  )
}

export default Sidebar