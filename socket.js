import {createServer} from 'node:http'
import express from 'express'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { Server } from 'socket.io'

const app=express()
const server=createServer(app)

const io=new Server(server)
const __dirname=path.dirname(fileURLToPath(import.meta.url))

//import.meta.url    file:///C:/project/src/index.js
//fileURLToPath      C:\project\src\index.js
//path.dirname       C:\project\src


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'socket.html'))
})

server.listen(3000,()=>{
    console.log(`server listening at 3000`)
})

io.on('connection',(socket)=>{
    console.log(`a user ${socket.id} connected`)
    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg)
    })
})
