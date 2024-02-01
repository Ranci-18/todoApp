import React from 'react';
import Navbar from './Navbar';

export default function Header({loggedIn, loggingOut}) {
  return (
    <header>
      <Navbar loggedIn={loggedIn} loggingOut={loggingOut} />
    </header>
  )
}
