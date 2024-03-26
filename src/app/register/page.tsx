'use client' 
import ButtonLoader from '@/components/loaders/button-loader';
import Axios from '@/utils/axios';
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
            NotificationManager.error("Error occured while signing up")
            console.log(e)
            setLoading(false)
        }
    }

    return (
        <main className="h-screen flex mx-auto items-center justify-center">
            <form method="POST" onSubmit={handleSubmit}>
                <div className='space-y-4 flex flex-col items-center'>
                <h1 className="text-center text-xl font-bold mb-10">Register an account with us</h1>
                <input className="px-3 py-1.5 rounded-md  outline-none border border-gray-300 w-full" placeholder="Enter email" type='email'
                    value={email} onChange={(e)=> {
                        setEmail(e.target.value)
                    }}/>
                    <input className="px-3 py-1.5 rounded-md  outline-none border border-gray-300 w-full" placeholder="username" type='text'
                    value={username} onChange={(e)=> {
                        setUsername(e.target.value)
                    }}/>
                    <input className="px-3 py-1.5 rounded-md  outline-none border border-gray-300 w-full" placeholder="password" type='password'
                    value={password} onChange={(e)=> {
                        setPassword(e.target.value)
                    }}/>

                    <div>
                        <p className='text-sm'>Already have an account? <a href='/login' className='text-blue-400'>Login</a></p>
                    </div>
                    <button type='submit' className='rounded-md px-2 py-1.5 bg-blue-400 text-white w-full hover:bg-blue-200' disabled={loading}>
                        {loading ? <ButtonLoader/> : 'Register'}
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Register