'use client'
import { fetchWithToken } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try{
        const res = await fetchWithToken('me');
        console.log(res)
        setUser(res.username)
      } catch (e) {
        console.log(e)
      }
    }

    getUser()
    if(window){
      const token = localStorage.getItem('access_token')
    if (token) {
      setAuthenticated(true)
    }
    }
  }, []);

  return (
    <div>
      <p className="mobile text-center uppercase lg:hidden font-bold text-md mt-[50%]">
        please open on a bigger screen
      </p>
      <main className="flex flex-col items-center justify-center w-screen h-full pt-10 px-10">
        <div className="justify-between items-center w-full flex">
          {/* <img
            src="/logo.png"
            alt="logo"
            className="h-6 w-6 mx-auto"
          /> */}
          <div className="text-lg font-bold text-purple-950">KnowtifAI</div>
          {!authenticated ? (
            <div className="flex gap-8">
            <Link href={'login'}><button className="px-4 py-2 rounded-md text-white bg-blue-700">Login</button></Link>
            <Link href={'register'}><button className="px-4 py-2 rounded-md text-white bg-blue-700">Register</button></Link>
          </div>
          ): (<p className="capitalize text-lg">Hi👋 {user}</p>)}     
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4 text-center mt-7">Welcome to knowtifAI</h1>
          <p className="text-lg my-9">
            Empower learners with interactive learning experiences! 
          </p>
          <h2 className="text-2xl font-bold my-3">What We Offer</h2>
          <ul className="space-y-2 pl-5">
            <li>
              <strong>Video Interaction:</strong> Interact with videos using AI to
              generate summaries and quizzes.
            </li>
            <li>
              <strong>Upload Learning Materials:</strong> Easily upload learning
              materials such as PDFs to interact with and generate quizzes.
            </li>
          </ul>

          <h3 className="font-bold text-2xl text-center my-14">Try it out !</h3>

          <div className="flex gap-10 items-center justify-between">
            <Link href={'video'}>
              <div className="rounded-md p-3 border-2 border-purple-900 w-[30rem] h-44 hover:bg-purple-200 cursor-pointer">
                <p className="text-lg mb-4 font-semibold text-center">Upload Videos via youtube link</p>
                <p className="text-sm">Upload videos through YouTube links and enrich your learning materials.  KnowtifAI can automatically generate quizzes based on video content, foster discussions through prompts, and track viewer engagement for deeper insights.  Transform your videos into interactive learning tools! </p>
              </div>
            </Link>

            <Link href={'slide'}>
              <div className=" rounded-md p-3 border-2 border-purple-900 w-[30rem] h-44 hover:bg-purple-200 cursor-pointer">
                <p className="text-lg mb-4  font-semibold text-center">Upload PDFs</p>
                <p className="text-sm">Upload your PDF documents to KnowtifAI and unlock a world of possibilities: ➡️ Automatic quiz generation , engaging content creation , and in-depth data analytics  for a truly effective learning journey. </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
