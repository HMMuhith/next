import next from "next";
import {createServer} from 'node:http'
import { Server } from "socket.io";


const app=next({dev:true,hostname:'localhost',port:3000})

const handler=app.getRequestHandler()
const startserver=async()=>{
    await app.prepare()

    const server=createServer(handler)
    const io= new Server(server)

    io.on('connection',(socket)=>{
        console.log(`A user ${socket.id} connected`)
socket.on('chat-message',(msg)=>{
    const message={
        text:msg,
        senderId:socket.id
    }
    io.emit('chat-message',message)
})

socket.on('disconnect',()=>{
    console.log(`user ${socket.id} disconnected`)
})


    })
    server.listen(3000,()=>{
    console.log(`🚀 Server running at 3000`)
})
}

startserver()