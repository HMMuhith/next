'use client'
import React,{ useEffect, useRef, useState } from 'react'
import image1 from '../../../public/71SRwYaVx3L._SX3000_.jpg'
import image2 from '../../../public/71t6-l+UneL._SX3000_.jpg'
import image3 from '../../../public/71z3-+jDtcL._SX3000_.jpg'
import image4 from '../../../public/81DKIMqhSQL._SX3000_.jpg'
import image5 from '../../../public/81H-rqTT6QL._SX3000_.jpg'
import image6 from '../../../public/81jDd5S9ewL._SX3000_.jpg'
import image7 from '../../../public/81YK5C5+3vL._SX3000_.jpg'
import image8 from '../../../public/B1Kw+ZArijL._SX3000_.jpg'
import Image from 'next/image';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";



const Images=[image1,image2,image3,image4,image5,image6,image7,image8]
const Carousel=()=>{

const [Index,setIndex]=useState(0)

const intervalref=useRef(null)

const startInterval=()=>{
    intervalref.current=setInterval(()=>{
        setIndex((prev)=>(prev+1)%Images.length)
    },4000)
}
const resetInterval=()=>{
    clearInterval(intervalref.current)
    startInterval()
}

useEffect(()=>{
    startInterval()
    return ()=>clearInterval(intervalref.current)
    },[Images.length])

const prev=()=>{setIndex(prev=>(prev-1+Images.length)%Images.length);resetInterval()}
const next=()=>{setIndex(prev=>(prev+1)%Images.length);resetInterval()}
return (<>
<div>
    <div className='relative flex justify-center items-center'>
    <Image src={Images[Index]} width={1000} alt='slide'/>
    </div>
    <div className='absolute top-56 right-56 cursor-pointer'>
        <GrNext onClick={next} className='text-white'/>
    </div>
    <div className='absolute top-56 left-56 cursor-pointer'>
<GrPrevious onClick={prev} className='text-white'/>
    </div>
</div>
</>)
}

export default Carousel