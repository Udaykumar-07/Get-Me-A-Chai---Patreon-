'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import {useState} from 'react' 


const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)
  
  return (
    <nav className='flex justify-between px-4 bg-purple-700 py-2'>
      <div className="logo">Get Me a Chai</div>
          {session && (
            <>
<div className='w-[87vw] flex justify-end pr-[7px] md:pr-2'>
<button onClick={()=> setshowdropdown(!showdropdown)} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{session.user.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  d="m1 1 4 4 4-4"
/>

</svg>
</button>


<div
  id="dropdownHover"
  className={`z-10 ${showdropdown ? "" : "hidden"} absolute my-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700`}
>

    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
      <li>
        <Link href="/dashboard"className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
      </li>
      <li>
        <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
      </li>
      <li>
        <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign Out</Link>
      </li>
     
    </ul>
</div>
</div>
            <button className='text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ' onClick={()=>  signOut()}
               >Logout</button>
               </>
               )}
         {!session && (<Link onClick={() => signOut()} href="/Login">
         <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 '>Login</button></Link>)}
         
        
   
    </nav>
  )
}

export default Navbar
