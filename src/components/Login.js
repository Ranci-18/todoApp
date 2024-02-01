import React, { useState } from 'react';
import app from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ userLoggingIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            userLoggingIn()
            setEmail('');
            setPassword('');
        } catch (e) {
            alert('Error logging in: ' + e.message);
        }
    }
  return (
    <div className='border-solid border-2 border-neutral-800 flex flex-col items-center w-3/5'>
        <h1 className='text-2xl font-bold mb-4'>Login</h1>
        <label className='mb-2 w-4/5'>
            <p>Email</p>
            <input type="email"
                id='email'
                className='w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </label>
        <label className='mb-2 w-4/5' htmlFor='signinPassword'>
            <p>Password</p>
            <input type="password"
                className='w-full'
                id='siginPassword'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
             />
        </label>
        <button className='bg-neutral-500 text-white rounded-md py-2 px-4 mb-2 hover:bg-white hover:text-neutral-500 ease-in duration-300'
            onClick={() => {
                login()
            }}
        >
            Login
        </button>
    </div>
  )
}
