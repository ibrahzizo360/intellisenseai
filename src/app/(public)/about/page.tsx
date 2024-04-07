import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <main className='mt-[88px] bg-white'>

        <div className="flex mx-auto w-[80%] py-24 gap-10">
            <div className='p-8 bg-[#e7fefc] rounded-3xl'>
                <p className='text-[#A43697]'>How it started</p>

                <h1 className=' text-4xl font-bold mt-8 mb-10'>We aspire to foster a worldwide revolution in learning with AI.</h1>


                <p className='text-gray-600 text-sm'>KnowtifAI was established by Ibrahim Aziz, a dedicated lifelong learner, full-stack developer, and AI expert, along with Ohene-Agyekum Addo-Agyekum, a data scientist/ML engineer, statistician, and researcher. Their mutual vision was to develop a user-friendly platform that empowers students, researchers, and users from all walks of life to effortlessly acquire knowledge and learn with minimal stress. Driven by their shared belief in the transformative potential of AI and education, they set out to create &quot;KnowtifAI,&quot; pronounced like &quot;notify.&quot; With unwavering commitment, they assembled a team of experts and launched this innovative platform, fostering a global community of enthusiastic learners united by their passion to explore, learn, and thrive with AI.</p>
            </div>

            <div>
                <Image src={'/team-pic.svg'} width={606} height={429} alt="team-pic" />

                <div className='w-[606px] rounded-3xl bg-[#e7fefc] p-6 mt-4 text-center'>
                    <p>“It used to be about mastery of content. Now, students need to understand content, but it&apos;s much more about mastery of the interpretation and utilization of the content.”
                    <br/>-<span className='underline'> Inside Higher Ed</span></p>
                </div>
            </div>
        </div>

        <div className='mt-24 mx-auto w-[80%] '>
        <p className='ml-8 text-[#A43697]'>Meet the Team</p>

        <h2 className='font-bold ml-8 text-3xl mt-7 mb-7'>Meet our dedicated team of innovators</h2>

        <div className="flex py-12 px-16 bg-[#e7fefc] rounded-md mb-12 justify-evenly">
            <div className="relative">
                <Image src={'/ohene.svg'} width={321} height={350} alt="member-pic" />

                <Image src={'/logo-round-2.svg'} width={28} height={28} alt="logo" className='absolute top-0 left-0 mt-4 ml-7' />

                <div className="grid place-items-center w-full absolute bottom-3">
                
                <div className='bg-white p-3 text-[10px] w-[231px] mx-auto rounded-3xl text-center mt-4 '>

                <div className="flex gap-3 items-center">
                    <div>
                    <p className='font-semibold'>Ohene-Agyekum Addo-Agyekum</p>
                    <p className='text-gray-600'>Data Scientist/ML Engineer</p>
                    </div>

                    <Link href="#"><Image src={'/linkedin.png'} width={35} height={10} alt="linkedin" /></Link>
                </div>
                </div>
                </div>
            </div>


            <div className="relative">
                <Image src={'/zizo.svg'} width={321} height={350} alt="member-pic" />

                <Image src={'/logo-round-2.svg'} width={28} height={28} alt="logo" className='absolute top-0 left-0 mt-4 ml-7' />

                <div className="grid place-items-center w-full absolute bottom-3">
                
                <div className='bg-white p-3 text-[10px] w-[231px] mx-auto rounded-3xl text-center mt-4 '>

                <div className="flex gap-3 items-center">
                    <div>
                    <p className='font-semibold'>Ibrahim Aziz</p>
                    <p className='text-gray-600'>Tech Lead/Software engineer</p>
                    </div>

                    <Link href="#"><Image src={'/linkedin.png'} width={35} height={10} alt="linkedin" /></Link>
                </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    </main>
  )
}

export default About