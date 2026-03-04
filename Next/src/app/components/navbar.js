'use client'

import Link from "next/link"
import React from "react"

const Navbar=()=>{

    return (<>
    <div className="w-full bg-amber-600 h-14 flex justify-center items-center">
    <nav>
        <ul className="flex items-center  justify-center gap-7 cursor-pointer">
            <li className="flex relative w-28 group items-center gap-1 justify-center "><Link href='#'>Products</Link><img src="keyboard_arrow_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" className="mt-1.5" width='30px' alt="" />
            <ul className="bg-blue-800 absolute top-10 z-10 w-full group-hover:opacity-100 flex  group-hover:visible transform transition-all delay-200 ease-in opacity-0 hover:opacity-100">
                <div className="pl-2.5 flex flex-col gap-3 py-2">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                </div>
            </ul>
            </li>
            <li className="w-28"><Link href='#'>App</Link></li>
            <li className="w-28"><Link href='#'>Developers</Link></li>
            <li className="flex justify-center relative w-28 group  items-center"><Link href='#'>Pricing</Link> <img src="keyboard_arrow_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" className="mt-1.5" width='30px' alt="" />
            <ul className="bg-blue-400 w-full opacity-0 group-hover:opacity-100 group-hover:visible absolute group top-10 z-30">
                <div className="pl-2.5 flex  flex-col gap-3 py-2">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </div>
            </ul>
            </li>
            <li className="w-28"><Link href='#'>Resources</Link></li>
            <li className="w-28"><Link href='#'>Contact</Link></li>
        </ul>
    </nav>
    </div>
    </>)
}

export default Navbar