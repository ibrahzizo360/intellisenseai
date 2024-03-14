'use client' 
import {useState} from 'react'

const Login:React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log("User entered this username  :", username)
    }

    return (
        <main className="h-screen flex mx-auto items-center justify-center">
            <form method="POST">
                <div className='space-y-4 flex flex-col items-center'>
                <input className="px-3 py-1.5 rounded-md" placeholder="username" type='text'
                value={username} onChange={(e)=> {
                    setUsername(e.target.value)
                }}/>
                <input className="px-3 py-1.5 rounded-md" placeholder="password" type='password'
                value={password} onChange={(e)=> {
                    setPassword(e.target.value)
                }}/>
                <button type='submit' className='rounded-md px-2 py-1.5 bg-blue-400' onClick={handleSubmit}>Login</button>
                </div>
            </form>
        </main>
    )
}

export default Login