import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from './firebase';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);

    async function signup() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created!');
            setEmail('');
            setPassword('');
        } catch (e) {
            alert('Error signing up: ' + e.message);
        }
    }
  return (
    <div className='border-solid border-2 border-neutral-800 flex flex-col items-center w-3/5'>
        <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
        <label htmlFor='signupEmail' className='mb-2 w-4/5'>
            <p>Email</p>
            <input type="email"
                id='signupEmail'
                className='w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </label>
        <label className='mb-2 w-4/5' htmlFor='signupPassword'>
            <p>Password</p>
            <input type="password"
                className='w-full'
                id='signupPassword'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
             />
        </label>
        <button className='bg-neutral-500 text-white rounded-md py-2 px-4 mb-2 hover:bg-white hover:text-neutral-500 ease-in duration-300'
            onClick={() => signup()}
        >
            Sign Up
        </button>
    </div>
  )
}
