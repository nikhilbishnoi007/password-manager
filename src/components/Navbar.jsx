import React from 'react'
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-between items-center p-4'>
        <div className="logo font-bold ">
        <span className='text-green-700'>&lt;</span>
        <span>Pass</span><span className='text-green-700'>Box/&gt;</span>
            </div>
        {/* <ul className='flex gap-2'>
            <li><a href="/" className='hover:font-bold'>Home</a></li>
            <li><a href="/" className='hover:font-bold'>About</a></li>
            <li><a href="/" className='hover:font-bold'>Contact</a></li>
        </ul> */} 
      <a href="https://github.com/nikhilbishnoi007" className='cursor-pointer flex  items-center justify-between  gap-1 rounded-md '><FaGithub/><span>GitHub</span></a>
    </nav>
  )
}

export default Navbar
