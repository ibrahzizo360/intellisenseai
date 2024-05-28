'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NotificationManager } from 'react-notifications';
import { IoEyeOff, IoEye } from 'react-icons/io5';
import ButtonLoader from '@/components/loaders/button-loader';
import Axios from '@/utils/axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!email || !password) {
                NotificationManager.error('Please fill all fields');
                throw new Error('Please fill all fields');
            }
            const res = await Axios.post('login', {
                email,
                password,
            });
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('username', res.data.username);
            NotificationManager.success('Successfully logged in');
            window.location.href = '/document';
        } catch (e: any) {
            if (e.response.status === 401) {
                NotificationManager.error(e.response.data.detail);
            } else {
                NotificationManager.error('Error occurred while logging in. Please try again later');
                console.error(e);
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <main className="h-screen flex">
            <Image src="/login.svg" className="h-screen w-[40%] hidden lg:block" height={0} width={0} sizes="100vh" alt="logo" />

            <div className="w-full bg-[#DBEEED]">
                <form method="POST" onSubmit={handleSubmit} className="mx-auto w-[60%]">
                    <div className="flex flex-col items-center my-24">
                        <Link href={'/'}>
                            <Image src="/logo-round.svg" height={60} width={60} alt="logo" />
                        </Link>

                        <h1 className="text-center text-2xl font-bold mb-10 mt-16 text-gray-600 tracking-wide">Welcome Back!</h1>

                        <input
                            className="px-12 py-5 rounded-3xl outline-none border border-green-500 w-full mb-6"
                            placeholder="Email address"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <div className="relative w-full">
                            <input
                                className="px-12 py-5 rounded-3xl outline-none border border-green-500 w-full mb-3 pr-14"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-8 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <IoEyeOff size={30} /> : <IoEye size={30} />}
                            </button>
                        </div>

                        <div className="text-left w-full pl-10 mb-8">
                            <Link href="/forgot-password" className="text-green-500">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="mt-7 rounded-3xl px-2 py-5 bg-[#14a760] hover:bg-[#3f9c6f] text-white w-full" disabled={loading}>
                            {loading ? <ButtonLoader /> : 'Sign In'}
                        </button>

                        <div className="mt-4">
                            <p className="text-sm">
                                Don&apos;t have an account? <Link href="/register" className="text-green-500 ml-3">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
