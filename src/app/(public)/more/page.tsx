import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Tinos, Judson } from 'next/font/google';

const tinos = Tinos({
    subsets: ["latin"],
    weight: "400",
    variable: "--tinos"
});

const judson = Judson({
    subsets: ["latin"],
    weight: "400",
    variable: "--judson"
});

function More() {
  return (
    <main className='mt-[128px] bg-white'>
        <header className='flex items-center w-[90%] mx-auto'>
            <Image src="logo-big.svg" alt="logo" width={500} height={175} />
            <p className='text-[1rem] leading-[18px] text-gray-700'>At KnowtifAI, we firmly believe that in this modern age, accessing knowledge and honing your skills shouldn&apos;t feel like climbing Mount Everest. That&apos;s why we&apos;re passionately dedicated to revolutionizing the learning experience with our cutting-edge app. Say Goodbye to the struggle and Hello to a smoother, more efficient path towards academic excellence. </p>
        </header>
        <Image src="hand-shake.svg" alt="header-img" width={1136} height={401} className='mx-auto my-7' />

        <h2 className='mt-44 uppercase text-3xl text-center'>What are we doing for companies and institutions?</h2>
        <p className={`mx-auto w-[58%] mt-4 ${tinos.className}`}>We&apos;re poised and enthusiastic about customizing our platform to cater specifically to the needs of companies, institutions, and corporate bodies. Whether it&apos;s facilitating online studies, delivering corporate training programs, or addressing other personalized requirements, we&apos;re here to tailor our solutions to your unique needs. With KnowtifAI by your side, embrace seamless learning experiences and empower your workforce with the tools they need to succeed.</p>

        <Link href={'#'}>
            <div className={`py-3 px-8 text-white rounded-xl bg-[#39CA9E] max-w-fit mx-auto my-8 text-xl ${tinos.className}`}>Reach Out Now</div>
        </Link>

        <div className="flex mx-auto w-[65%] gap-5 my-36">
            <div className="">
                <h1 className="text-4xl uppercase">knowtifai communities</h1>
                <p className={`mt-3 ${tinos.className}`}>
                Join us in building an extraordinary global community of learners and researchers through KnowtifAI! Our vision is to unite students from universities worldwide, fostering a vibrant exchange of experiences, skills, and cultures. 
                </p>
                <p className={`mb-5 mt-2 ${tinos.className}`}>
                Together, we&apos;re not just enhancing individual learning journeys; we&apos;re weaving a tapestry of connections that strengthens bonds across continents. With unwavering passion, we&apos;re committed to creating a platform where every voice is heard, every experience celebrated, and every learner empowered. Join us on this exhilarating journey to transform education and inspire the world.
                </p>
                <div className={`py-2 px-4 mx-auto uppercase bg-[#821676] max-w-fit rounded-ss-3xl rounded-r-3xl text-white ${tinos.className}`}>coming soon</div>
            </div>
            <Image src={'chess.svg'} alt='chess-image' width={420} height={348} />
        </div>

        <div className="w-[90%] mx-auto bg-[url('/investment.svg')] px-6 py-12 bg-no-repeat bg-cover mb-20 rounded-lg">
            <div className="flex justify-between">
            <div className={`w-[60%] ${judson.className} `}>
            <h2 className="text-white text-[64px]">Dear Investors,</h2>

            <p className='text-white text-[50px] leading-[55px] mt-7'>Your investment fuels our mission to empower minds and transform education for generations to come.</p>
            </div>
            <div className='flex flex-col justify-between'>
                <div></div>
                <div className="px-10 py-4 bg-white rounded-r-3xl rounded-es-3xl text-xl cursor-pointer border-2 border-black">
                    Request For Business Plan
                </div>
            </div>
            </div>
            
        </div>

    </main>
  )
}

export default More