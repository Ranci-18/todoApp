import React from 'react'

export default function Navbar({loggedIn, loggingOut}) {
  return (
    <div className='text-neutral-900 font-bold flex justify-evenly items-center'>
      <h1 className='absolute top-0 left-0 text-3xl'>Todo App</h1>
      {
        loggedIn ? (
          <button className='bg-neutral-500 text-white rounded-md py-2 px-4 mb-2 hover:bg-white hover:text-neutral-500 ease-in duration-300 absolute top-0 right-0'
            onClick={() => {loggingOut()}}
          >
            Log Out
            </button>
        ) : (
          null
        )
      }
    </div>
  )
}
