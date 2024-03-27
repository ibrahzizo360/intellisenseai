'use client' 
import ButtonLoader from '@/components/loaders/button-loader';
import Axios from '@/utils/axios';
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
        <main className="h-screen flex mx-auto items-center justify-center">
            <form method="POST">
                <div className='space-y-4 flex flex-col items-center'>
                    <h1 className="text-center text-xl font-bold mb-10">Login to your KnowtifAI account</h1>

                    <input className="px-3 py-1.5 rounded-md outline-none border border-gray-300 w-full" placeholder="email" type='text'
                    value={email} onChange={(e)=> {
                        setEmail(e.target.value)
                    }}/>
                    <input className="px-3 py-1.5 rounded-md outline-none border border-gray-300 w-full" placeholder="password" type='password'
                    value={password} onChange={(e)=> {
                        setPassword(e.target.value)
                    }}/>

                    <div>
                        <p className='text-sm'>Don&apos;t have an account? <a href='/register' className='text-blue-400'>Register</a></p>
                    </div>

                    <button type='submit' className='rounded-md px-2 py-1.5 bg-blue-400 text-white w-full hover:bg-blue-200' disabled={loading} onClick={handleSubmit}>
                        {loading ? <ButtonLoader/> : 'Login'}
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Login