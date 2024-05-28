'use client'
import { fetchWithToken, getUser } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { GrAnalytics } from 'react-icons/gr'
import { IoMdExit } from 'react-icons/io'
import { IoCloudUploadOutline, IoSettingsOutline } from 'react-icons/io5'
import { LiaUserCircleSolid } from 'react-icons/lia';
import { MdContentPasteSearch } from 'react-icons/md';
import { store } from '@/store/store'
import { useDispatch } from 'react-redux'
import { setNewSession } from '@/store/chat-slice'

const Sidebar = () => {
  const username = getUser();
  const [chats, setChats] = useState([]);
  const path = usePathname();
  const split = path.split('/');
  const session_id = split[split.length - 1];
  const dispatch = useDispatch();

  const toggleNewSession = store.getState().session.new;
  console.log("new",toggleNewSession)

  useLayoutEffect(() => {
    if (!username) {
      window.location.href = '/login'
    }

    getSessions();
  }
  , [username,toggleNewSession])

  const [loading, setLoading] = useState(false)
  const getSessions = async () => {
    setLoading(true)
    try {
      const sessions = await fetchWithToken('get_user_sessions')
      console.log('sessions', sessions)
      setChats(sessions)
    } catch (error) {
      console.log('error', error)
    }
    setLoading(false)
  }

  if(toggleNewSession){
    setTimeout(() => {
      getSessions();
      dispatch(setNewSession(false))
    }, 200);
  }

  return (
    <div className='h-screen w-[20vw] bg-[#DCEEED]'>
      <Image src={'/sidebar-logo.svg'} alt='logo' height={39} width={154} className='p-2' />

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
       
        {chats.map((chat: any) => (
          <Link
            href={chat.type === "video" ? `/media/${chat.session_id}` : `/document/${chat.session_id}`}
            key={chat.name}
          >
            <div
              className={`flex items-center mx-8 my-2 gap-4 ${
                chat.session_id == session_id ? 'bg-[#6c71c7]' : 'bg-slate-400'
              } px-3 py-1 rounded-md text-white cursor-pointer`}
            >
              <BsChatDots />
              <p className='text-sm'>{chat.name}</p>
            </div>
          </Link>
        ))}
        
       
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

      {username ? (
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
      ) : (<div>
        <Link href='/login'>
        <div className="mx-10 mt-20 flex-col flex">
        <div className="flex items-center gap-3 cursor-pointer mx-auto mb-2">
        <LiaUserCircleSolid className='h-6 w-6' />
        <p className='text-md'>Sign In</p>
        </div>
        </div>
        </Link> 
      </div>) }


    </div>
  )
}

export default Sidebar