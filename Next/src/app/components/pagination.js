'use client'

import React from "react"

const Pagination=()=>{

return (
<>
<div className="grid place-items-center ">
    <ul className=" flex justify-center items-center text-xl gap-3 my-10">
       { [1,2,3,4,5,6].map((num,index)=>
        <li className="py-2 px-6 bg-cyan-700 text-white rounded-xl cursor-pointer hover:bg-cyan-500" key={index}>{num}</li>
       )
       }
    </ul>
</div>
</>)
}

export default Pagination