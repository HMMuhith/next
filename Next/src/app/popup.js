'use client'
import { useState } from 'react'
import {IoIosCloseCircleOutline} from 'react-icons/io'

const Popup=({onClose})=>{
    const [display,setdisplay]=useState(true)

    const displayHandler=()=>{
        setdisplay(false)
    }
return (
    <>
 
    <div className="min-h-screen fixed inset-0 z-40 flex justify-center items-center bg-[rgba(0,0,0,0.6)] backdrop-blur-3xl ">
        <div onClick={onClose} className='absolute top-4 right-4 text-white cursor-pointer'>
            <IoIosCloseCircleOutline />

        </div>
 <img src='/3298826.jpg'className="w-1/3 border  flex justify-center items-center bg-[#ecfcca] border-blue-400 outline-none " />

    </div>

    </>
)
}

export default Popup