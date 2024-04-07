'use client' 
import ButtonLoader from '@/components/loaders/button-loader';
import Axios from '@/utils/axios';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react'
import { NotificationManager } from 'react-notifications';

const Login:React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!email || !password) {
                NotificationManager.error('Please fill all fields')
                throw new Error('Please fill all fields')
            }
            const res = await Axios.post('login', {
                email,
                password
            })
            console.log(res.data.access_token)
            localStorage.setItem('access_token', res.data.access_token)
            NotificationManager.success('Successfully logged in')
            window.location.href = '/'
        } catch(e:any){
            if(e.response.status == 401) {
                NotificationManager.error(e.response.data.detail)
            }else{
                NotificationManager.error("Error occured while logging. Please try again later")
            console.log(e)
            }
        }
    }

    return (
        <main className="h-screen flex">
            <Image src='/login.svg' className='h-screen w-[40%]' height={0} width={0} sizes='100vh' alt='logo' />

            <div className="w-full bg-[#DBEEED]">
            <form method="POST" onSubmit={handleSubmit} className='mx-auto w-[60%]'>
                <div className='flex flex-col items-center my-24'>
                
                <Link href={'/'}><Image src='/logo-round.svg' height={60} width={60} alt='logo' className='' /></Link>
                    
                <h1 className="text-center text-2xl font-bold mb-10 mt-16 text-gray-600 tracking-wide">Welcome Back!</h1>

                <input className="px-12 py-5 rounded-3xl  outline-none border border-green-500 w-full mb-6" placeholder="Email address" type='email'
                    value={email} onChange={(e)=> {
                        setEmail(e.target.value)
                    }}/>
                    <input className="px-12 py-5 rounded-3xl  outline-none border border-green-500 w-full mb-3" placeholder="Password" type='password'
                    value={password} onChange={(e)=> {
                        setPassword(e.target.value)
                    }}/>

                    <div className='text-left w-full pl-10 mb-8'>
                        <a href='/forgot-password' className='text-green-500'>Forgot Password?</a>
                    </div>

                    
                    <button type='submit' className='mt-7 rounded-3xl px-2 py-5 bg-[#14a760] hover:bg-[#3f9c6f] text-white w-full' disabled={loading}>
                        {loading ? <ButtonLoader/> : 'Sign In'}
                    </button>

                    <div className='mt-4'>
                        <p className='text-sm'>Don&apos;t have an account? <a href='/register' className='text-green-500 ml-3'>Sign Up</a></p>
                    </div>
                </div>
            </form>
            </div>
        </main> 
    )
}

export default Login