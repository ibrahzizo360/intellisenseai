'use client' 
import ButtonLoader from '@/components/loaders/button-loader';
import Axios from '@/utils/axios';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react'
import { NotificationManager } from 'react-notifications';

const Register:React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (!username || !email || !password) {
                NotificationManager.error('Please fill all fields')
                throw new Error('Please fill all fields')
            }
            await Axios.post('register', {
                username,
                email,
                password
            })
            setLoading(false)
            NotificationManager.success('Successfully signed up')
            window.location.href = '/login'
        } catch(e:any){
            console.log(e)
            if(e.response.status == 400) {
                NotificationManager.error(e.response.data.detail)
            } else {
                NotificationManager.error("Error occured while signing up")
            }
        }finally{
            setLoading(false)
        }
    }

    return (
        <main className="h-screen flex">
            <Image src='/register.svg' className='h-screen w-[40%] hidden lg:block' height={0} width={0} sizes='100vh' alt='logo' />

            <div className="w-full bg-[#DBEEED]">
            <form method="POST" onSubmit={handleSubmit} className='mx-auto w-[60%]'>
                <div className='flex flex-col items-center my-24'>
                
                <Link href={'/'}><Image src='/logo-round.svg' height={60} width={60} alt='logo' className='' /></Link>
                    
                <h1 className="text-center text-2xl font-bold mb-10 mt-16 text-gray-600">Register an account with us</h1>

                <input className="px-12 py-5 rounded-3xl  outline-none border border-green-500 w-full mb-6" placeholder="Email address" type='email'
                    value={email} onChange={(e)=> {
                        setEmail(e.target.value)
                    }}/>
                    <input className="px-12 py-5 rounded-3xl  outline-none border border-green-500 w-full mb-6" placeholder="Username" type='text'
                    value={username} onChange={(e)=> {
                        setUsername(e.target.value)
                    }}/>
                    <input className="px-12 py-5 rounded-3xl  outline-none border border-green-500 w-full mb-6" placeholder="password" type='password'
                    value={password} onChange={(e)=> {
                        setPassword(e.target.value)
                    }}/>

                    
                    <button type='submit' className='mt-7 rounded-3xl px-2 py-5 bg-[#14a760] hover:bg-[#3f9c6f] text-white w-full' disabled={loading}>
                        {loading ? <ButtonLoader/> : 'Register'}
                    </button>

                    <div className='mt-4'>
                        <p className='text-sm'>Already have an account? <a href='/login' className='text-green-500 ml-3'>Login</a></p>
                    </div>
                </div>
            </form>
            </div>
        </main>
    )
}

export default Register