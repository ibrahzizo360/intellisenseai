'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { fetchWithToken } from "@/utils";
import { IBM_Plex_Mono, Jura } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "300"
});

const jura = Jura({
  subsets: ["latin"],
  weight: "600"
});

export default function Home() {


  

  return (
    <div>
      {/* <p className="mobile text-center uppercase lg:hidden font-bold text-md mt-[50%]">
        please open on a bigger screen
      </p> */}
      <main className="flex flex-col items-center justify-center w-screen h-full">
        <Header />

        <div className="flex bg-[#DBEEED] flex-col">
          <div className="w-[80%] mx-auto lg:my-24">
            <div className="flex justify-between lg:gap-96">
            <p className="text-xl tracking-wide mt-5">Faster and Easier way to learn with KnowtifAI:<span className="text-slate-700"> an AI-powered educational application offering a faster, easier, and more convenient way to engage with learning materials, and provides personalized assistance to enhance the learning experience.</span></p>

            <Image src={"/icon.svg"} width={200} height={200} alt="sdg-logo" />
            </div>


            <div className="flex justify-between lg:gap-56 my-24">

              <div className="flex flex-col gap-3 justify-center items-center rounded-md bg-white p-10 text-center">
                <Image src={'/YouTube.svg'} width={70} height={70} alt="youtube-logo" className="-mt-8" />

                <h2 className="font-semibold">Youtube video interaction</h2>   

                <p className={`text-slate-700 text-sm lg:w-96 ${ibm_plex_mono.className}`}>Access this feature and upload your preferred Youtube video link </p>
              </div>


              <div className="flex flex-col justify-center items-center rounded-md bg-white p-10 text-center">
                <Image src={'/Document.svg'} width={70} height={70} alt="youtube-logo" />

                <h2 className="font-semibold my-3">Lecture Notes / Text Assistance</h2>   

                <p className={`text-slate-700 text-sm lg:w-96 ${ibm_plex_mono.className}`}>Access this feature and upload your preferred document.</p>
                <br />
                <p className={`text-slate-700 text-sm lg:w-96 -mt-3 ${ibm_plex_mono.className}`}>**we are accepting only pdf format at this time</p>
              </div>
            </div>
          </div>


          <div className="flex flex-col justify-center items-center bg-[url('/ug-1.svg')] relative
           h-[700px] mx-auto w-[90%] text-center bg-cover bg-no-repeat mb-28">
            <div className="p-5 rounded-md absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-4xl text-white font-semibold mt-3 leading-snug w-[70vw]">We partner with a diverse range of educational and corporate institutions to deliver customized versions of KnowtifAI, tailored to their specific lecture and educational requirements. Additionally, we offer AI-powered online off-site corporate training programs designed to accelerate professional growth.</p>
            </div>
          </div>

          <div className="flex bg-white mb-24">
            <p className="text-green-600 text-center uppercase w-full font-semibold py-12">More about Us</p>
          </div>



          <div className="flex mx-auto w-[80%] lg:gap-36 mb-44">
            <Image src={'/about_1.svg'} width={600} height={391} alt="about-us" />

            <div className="flex bg-white rounded-3xl flex-col text-center justify-center items-center lg:h-[280px]
             p-10 lg:w-[460px] mt-12">
              <h2 className="font-semibold mb-8">Unleashing the power of AI</h2>

              <p className={`text-sm text-slate-700 ${ibm_plex_mono.className}`}>&quot;We leverage GPT tools and other cutting-edge technologies to create personalized, interactive learning journeys that spark curiosity and joy.&quot;</p>
            </div>
          </div>


          <div className="flex mx-auto w-[80%] lg:gap-36 mb-24 flex-row-reverse">
            <Image src={'/about_2.svg'} width={600} height={391} alt="about-us" />

            <div className="flex bg-white rounded-3xl flex-col text-center justify-center items-center lg:h-[280px]
             p-10 lg:w-[460px] mt-12">
              <h2 className="font-semibold mb-8">Building a diverse learning culture</h2>

              <p className={`text-sm text-slate-700 ${ibm_plex_mono.className}`}>&quot;We embrace all learners, regardless of background or ability. Through user data analysis, we understand the unique needs of different demographics and students with special needs.&quot;</p>
            </div>
          </div>



          <p className={`font-semibold text-center text-3xl w-[70%] mx-auto font-sans ${jura.className}`}>&quot;Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all&quot;</p>

          <p className={`font-light text-center text-3xl w-[70%] mx-auto my-10 ${jura.className}`}>SDG 4</p>



          <Image src={'/sdg-2.svg'} width={375} height={218} alt="sdg-logo" className="mx-auto" />


          <div className="bg-white mt-20">
            <div className="flex mx-auto w-[80%] gap-56 justify-between items-center py-24">
              <p className="w-[600px] text-2xl font-semibold tracking-wide">Ready to be KnowtifAI&apos;d? <span className="text-gray-600">Dive into KnowtifAI&apos;s educational AI tools and unlock endless possibilities for exploring your potential! Akwaaba!</span></p>


              <Link href="/register">
            <button className="bg-[#53DB13] hover:bg-[#84d160] px-10 py-5 rounded-xl mt-8 text-white bg-opacity-80">
              Get Started
            </button>
            </Link> 
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
