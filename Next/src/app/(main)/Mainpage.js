'use client'
import { useEffect, useState, Suspense } from "react";
import { TypeEffect } from "../components/typeeffect";
import { SlideText } from "../components/slidingtext";
import Popup from "../popup";
import LoadingSpinner from "../components/spinner";
import Carousel from "../components/carousel";
import LoadingLine from "../components/loadingline";
import Statschart from "../components/progresscircle";
import { SocketFunction } from "../components/socket";
import Pagination from "../components/pagination";

export default function MainPage() {

  const [display, setdisplay] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {

      setdisplay(false)
    }, 7000)
    return () => clearTimeout(timeout)
  }, [display])

  return (
    <div className="min-h-screen relative  bg-zinc-50 text-4xl font-mono">

      <div className="ml-[350px] mt-2">
        <SlideText />
      </div>
      <div className="ml-[500px] mt-6 w-80 ">
        <TypeEffect />
      </div>
      {display && <div>
        <Popup onClose={() => setdisplay(false)} />
      </div>}
      <div>
        <Suspense fallback={null}>
          <LoadingLine />
        </Suspense>
      </div>

      {/* <div>
  <LoadingSpinner/>
 </div> */}

      <div className="mt-6">
        <Carousel />
      </div>
      <div>
        <Statschart />
      </div>
      <div>
        <SocketFunction />
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

