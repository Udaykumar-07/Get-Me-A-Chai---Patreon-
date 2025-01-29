import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='bg-purple-700 flex flex-col justify-center items-center py-2'>
    <div className='text-sm'> <p className="text-sm ">
            &copy; {new Date().getFullYear()} Get Me a Chai. All rights reserved.
          </p></div>
    </div>
    </>
  )
}

export default Footer