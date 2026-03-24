'use client'
import { useState,useEffect } from "react"

export const TypeEffect=()=>{
     const words = ["hello", "world", "Muhith", "hi", "web","developer"];

 const [Index,setIndex]=useState(0)
 const [subindex,setsubindex]=useState(0)
 const [forward,setForward]=useState(true)
 const [blink,setBlink]=useState(true)

useEffect(()=>{
  const blinkInterval=setInterval(()=>{
setBlink(prev=>!prev)
  },500)

  return ()=>clearInterval(blinkInterval)
},[])

useEffect(()=>{
if(Index===words.length)
  return;

  if(forward && subindex===words[Index].length) {
    setTimeout(()=>
 {   setForward(false)
    return;},1000)
  }
  if(!forward && subindex===0){
    setForward(true)
    setIndex(prev=>(prev+1)%words.length)
  }

  const timeout=setTimeout(()=>setsubindex((prev)=>prev +( forward ? 1 : -1)),120)
  return ()=>clearTimeout(timeout)
},[forward,Index,words,subindex])
  return (
    <div className="flex  bg-zinc-50 text-4xl ">
      {words[Index].substring(0, subindex)}
      <span className={blink?'opacity-100':'opacity-0'}>|</span>
    </div>
  );
}