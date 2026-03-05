'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const Images = [
  '/71SRwYaVx3L._SX3000_.jpg',
  '/71t6-l+UneL._SX3000_.jpg',
  '/71z3-+jDtcL._SX3000_.jpg',
  '/81DKIMqhSQL._SX3000_.jpg',
  '/81H-rqTT6QL._SX3000_.jpg',
  '/81jDd5S9ewL._SX3000_.jpg',
  '/81YK5C5+3vL._SX3000_.jpg',
  '/B1Kw+ZArijL._SX3000_.jpg'
]

const Carousel = () => {
  const [Index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % Images.length)
    }, 4000)

    return () => clearInterval(intervalRef.current)
  }, [])

  const prev = () => setIndex(prev => (prev - 1 + Images.length) % Images.length)
  const next = () => setIndex(prev => (prev + 1) % Images.length)

  return (
    <div className="relative flex justify-center items-center w-full h-150">
      <Image
        src={Images[Index]}
        alt={`Slide ${Index}`}
        width={1000}
        height={600}
        className="object-contain"
      />

      <div className="absolute top-1/2 left-10 -translate-y-1/2 cursor-pointer" onClick={prev}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      <div className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer" onClick={next}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
    </div>
  )
}

export default Carousel