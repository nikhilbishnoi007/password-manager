import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-6 text-sm ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        
        
        <div>
          <p className="text-base font-medium">&copy; {new Date().getFullYear()} MyWebsite</p>
          <p className="text-gray-400 mt-1">All rights reserved.</p>
        </div>

      
      

        
        <div>
          <h3 className="text-base font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <span><FaInstagram /></span> <a href="https://www.instagram.com/nikhil.bishnoi007?igsh=bG95bjhmdWM3aTA4" className="hover:text-white">Instagram</a>
            </li>
            <li className="flex items-center gap-2">
              <span><BsTwitterX /></span> <a href="https://x.com/NBishnoi07?t=iuydqPL9Zwada9WIrquUQg&s=09" className="hover:text-white">Twitter (X)</a>
            </li>
            <li className="flex items-center gap-2">
              <span><FaGithub /></span> <a href="https://github.com/nikhilbishnoi007" className="hover:text-white">GitHub</a>
            </li>
            <li className="flex items-center gap-2">
              <span><FaLinkedinIn /></span> <a href="https://www.linkedin.com/in/nikhil-bishnoi-25b6b9332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-white">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
