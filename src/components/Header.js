import React from 'react';
import Navbar from './Navbar';

export default function Header({loggedIn, loggingOut}) {
  return (
    <header className='mb-10'>
      <Navbar loggedIn={loggedIn} loggingOut={loggingOut} />
    </header>
  )
}
