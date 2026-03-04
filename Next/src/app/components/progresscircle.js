'use client'

import { useEffect, useState } from 'react'

function DonutChart({ percentage, color }) {
  const [progress,setprogress]=useState(0)

  useEffect(()=>{
    let start=0
   const Interval=setInterval(()=>{
      start+=1
    if(start <= percentage){
      setprogress(start)
      
    }
    else{
      clearInterval(Interval)
    }
  },20)
  
  },[percentage])

  return (
    <div className='relative w-[200px] h-[200px] flex justify-center items-center rounded-full text-center' style={{background:`conic-gradient(${color} ${progress* 3.6}deg, #eee 3deg)`}}>
<div className='absolute rounded-full w-2.5 h-2.5 flex justify-center bg-white items-center text-3xl font-bold text-pink-600'>{percentage}%</div>
    </div>
  )

}

export default function Statschart() {
  return (
    <div className='flex justify-center items-center my-20 gap-20'>
   <DonutChart percentage={78} color={`#4a7c2b`}/>
   <DonutChart percentage={65} color={`#c1d72f`}/>
   <DonutChart percentage={34} color={`#a0c95d`}/>
   </div>
  )
}
