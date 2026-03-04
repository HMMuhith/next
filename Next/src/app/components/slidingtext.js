'use client'
import { useState,useEffect, useRef } from "react"

const words=['Shyamoli', 'Hanif', 'SR','Shah Fateh Ali','Nabil']

export const SlideText=()=>{
    const [display,setDisplay]=useState(0)
    const [totalwidth,settotalWidth]=useState(0)
    const curentRef=useRef(null)
    const duplicateWord=[...words,...words]

useEffect(()=>{
    if(curentRef.current){
        settotalWidth(curentRef.current.scrollWidth/2)
    }
},[])

useEffect(()=>{
    if (totalwidth==0) return;
    const displayInterval=setInterval(()=>{
        setDisplay((prev)=>{
            
            if(-prev >= totalwidth) return 0;
            return prev-1.2
        })
    },20)

    return ()=>clearInterval(displayInterval)
},[totalwidth])
    return (
        <div className="w-[600px] bg-amber-200 overflow-hidden whitespace-nowrap">
            <div ref={curentRef} className="inline-block" style={{transform:`translateX(${display}px)`}}>
{duplicateWord.map((text,indx)=>{
return (<span key={indx} className="border mx-4 border-black text-black ">
    {text}
</span>)
})}
</div>
        </div>
    )

}