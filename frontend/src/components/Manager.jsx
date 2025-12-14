import React, { useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash, FaCopy } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [icon, seticon] = useState(true)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setPasswordsArray] = useState([])
    const getPasswords= async ()=>{
        let req= await fetch(`${API_URL}/api/passwords`)
        let passwords = await req.json()
        console.log(passwords)
         setPasswordsArray(passwords)
        
    }

    useEffect(() => {
        getPasswords()
       
    }, [])

    const SavePassword = async () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length>3 ){
            await fetch(`${API_URL}/api/passwords`,{method:"DELETE",headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:form.id})})
     setPasswordsArray([...passwordsArray ,{...form ,id:uuidv4()}])
    
    await fetch(`${API_URL}/api/passwords`,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({...form,id:uuidv4()})})
     setform({ site: "", username: "", password: "" })
     toast('Password Saved', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce
    });
}
    else{
        toast('Password  Not Saved Enter valid sitename,username or password', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce
        });
    }
    }
    const EditPassword=(id)=>{
     setform({...passwordsArray.filter(i=>i.id===id)[0],id:id})
     setPasswordsArray(passwordsArray.filter(item=>item.id!==id))
     toast('Password Edited Successfully', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce
    });
    }
    const DeletePassword = async (id) => {
        console.log("delete password with id", id)
        let a=confirm("do you really want to delete your password")
        if(a){
        setPasswordsArray(passwordsArray.filter(item=>item.id!==id))
        // localStorage.setItem("passwords",JSON.stringify(passwordsArray.filter(item=>item.id!==id)))
        let res= await fetch(`${API_URL}/api/passwords`,{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id})})
    }
    toast('Password Deleted Successfully', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce
    });
        
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-fit w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>

            <div className="mycontainer w-full px-4">
                <h1 className='text-2xl font-bold text-center'>
                    <span className='text-green-600'>&lt;</span>
                    <span>Pass</span><span className='text-green-600'>Box/&gt;</span>
                </h1>
                <p className='text-green-900 text-center text-lg'>your own password manager</p>

                {/* <div className="text-black flex flex-col p-4 gap-8 items-center"> */}
                <div className="text-black flex flex-col p-4 gap-8 items-center max-w-screen-sm mx-auto w-full">

                    <input value={form.site} onChange={handleChange} placeholder='Enter Url' type="text" name='site' className='bg-green-50 rounded-full border border-green-500 w-full text-black p-4 py-1' />

                    <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
                        <input value={form.username} onChange={handleChange} placeholder='Enter UserName' type="text" name='username' className='bg-green-50 rounded-full border border-green-500 w-full text-black p-4 py-1' />

                        <div className='w-full flex relative'>
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' name='password' type={icon ? "text" : "password"} className='bg-green-50 rounded-full border border-green-500 w-full text-black p-4 py-1' />
                            <button onClick={() => { seticon(!icon) }} className='cursor-pointer absolute top-[7px] right-[4px] '>
                                {icon ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <button className='flex justify-center items-center bg-green-600 rounded-full px-4 py-2 w-fit cursor-pointer hover:bg-green-500 text-white border border-green-900' onClick={SavePassword}>
                        Save Password
                        <lord-icon src="https://cdn.lordicon.com/tsrgicte.json" trigger="hover"></lord-icon>
                    </button>
                </div>

                <div className="passwords overflow-x-auto">
                    <h2 className='font-bold text-xl text-center py-4'>Your Passwords</h2>
                    {passwordsArray.length === 0 && <div className='text-center'>No Passwords to show</div>}
                    {passwordsArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden min-w-[600px]">
                            <thead className='bg-green-800 text-white border border-rounded'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordsArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 border border-white text-center min-w-32'>
                                            <div className='flex gap-2 justify-center'>
                                                <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                <button className='cursor-pointer' onClick={() => copyText(item.site)}><FaCopy /></button>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center min-w-32'>
                                            <div className='flex gap-2 justify-center'>{item.username}
                                                <button className='cursor-pointer' onClick={() => copyText(item.username)}><FaCopy /></button>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center min-w-32'>
                                            <div className='flex gap-2 justify-center'>{item.password}
                                                <button className='cursor-pointer' onClick={() => copyText(item.password)}><FaCopy /></button>
                                            </div>
                                        </td>
                                        <td className='flex justify-center gap-2 py-2'>
                                            <button className='cursor-pointer'onClick={()=>{EditPassword(item.id)}}><MdEdit /></button>
                                            <button className='cursor-pointer' onClick={()=>{DeletePassword(item.id)}}><MdDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
