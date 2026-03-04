'use client'
import { useState,useEffect } from 'react'
import {io} from 'socket.io-client'


export const SocketFunction=()=>{
const [Socket,setSocket]=useState(null)
const [connected,setConnected]=useState(false)
const [transport,setTransport]=useState('N/A')
const [sendMessage,setsendMessage]=useState('')
const [receiveMessage,setreceiveMessage]=useState([])
const [myId,setmyId]=useState('')
const [Open,setOpen]=useState(false)
const [sweep,setsweep]=useState(false)
useEffect(()=>{
  const s=io()
  setSocket(s)
    if (s.connected) {
      onConnect();
    }
s.on('chat-message',(msg)=>{
    setreceiveMessage((prev)=>[...prev,msg])
})
  function onConnect(){
    setmyId(s.id)
    setConnected(true)
    setTransport(s.io.engine.transport.name)
     s.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
  }

  
    function onDisconnect() {
      setConnected(false);
      setTransport("N/A");
    }

     s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
    };
},[])
const Click=()=>{
  if(sweep===false){
    setsweep(true)
    setTimeout(()=>{
      setOpen(true)
    },300)
  }
  else{
    setsweep(false)
    setOpen(false)
  }

}

const dispatchMessage=(e)=>{
    e.preventDefault();
    Socket.emit('chat-message',sendMessage)
    setsendMessage('')
    console.log(sendMessage)
    }
return (
    <>
    {/* <div id="chat-icon" onClick={Click} className={`w-12 h-12 cursor-pointer fixed right-0 transition-all transform origin-top-left duration-500 ease-in-out z-20 top-[150px] ${sweep?'-translate-x-[450px]':'translate-x-0'}`}>
      <svg viewBox="0 0 24 24" style={{stroke:'blue'}} fill="none" className='' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#1C274C" strokeWidth="1.5"></path> <path opacity="0.5" d="M8 10.5H16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M8 14H13.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
    </div> */}
    <div id="chat-icon" onClick={Click} className={`w-14 h-14 cursor-pointer fixed right-0 transition-all transform origin-top-left duration-500 ease-in-out z-20 top-[150px] ${sweep?'-translate-x-[450px]':'translate-x-0'}`}>
      <img src="/image.png" alt="" className='w-full h-full' />
    </div>
    { Open && <>
    <div className='fixed top-[180px] bg-white right-5 w-[450px] h-[70vh] scale-100 opacity-100 transform transition-all duration-800 z-10  flex flex-col rounded-lg overflow-hidden
    '>
      <ul className='flex flex-col flex-1 overflow-y-auto m-1.5 '>
      {receiveMessage.map((msg,i)=>{
      return  <li key={i} className={`${msg.senderId===myId?'bg-background-sender h-auto text-lg rounded-2xl py-2.5 px-4 text-white inline-block w-fit wrap-break-word m-1.5 max-w-64 self-start':'bg-background-receiver h-auto text-lg rounded-2xl py-2.5 px-4 inline-block w-fit wrap-break-word m-1.5 text-black max-w-64 self-end'}`}>
{msg.text}
        </li>
})}
      </ul>
       <form onSubmit={dispatchMessage} className='flex box-border w-full bg-background-form backdrop-blur-md p-1'>
<input type="text" value={sendMessage} className='outline-none border-none min-w-0 grow bg-slate-200 text-[16px] pl-1' onChange={(e)=>setsendMessage(e.target.value)}/>
<button className='py-2.5 px-2 shrink-0 text-[18px] bg-blue-400 rounded-r-lg cursor-pointer'>Send</button>
    </form> 
    </div>
   
    </>
}
    </>
)
}
