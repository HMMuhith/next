import fs from 'fs'
import path from 'path'
import express from 'express'

const app=express()

app.get('/',(req,res)=>{
    res.sendFile(path.join(process.cwd(),'stream.html'))
})

app.get('/video',(req,res)=>{
const FilePath=path.join(process.cwd(),'video.mp4')
const stat=fs.statSync(FilePath)
const filesize=stat.size
const range=req.headers.range
if(range){
    const parts=range.replace(/bytes=/,'').split('-')
    const start=parseInt(parts[0],10)
    const end=parts[1]?parseInt(parts[1],10):filesize-1
    const chunksize=(end-start)+1
    const file=fs.createReadStream(FilePath,{start,end})
    res.writeHead(206,{
        'content-range':`bytes ${start}-${end}/${filesize}`,
        'accept-ranges':'bytes',
        'content-length':chunksize,
        'content-type':'video/mp4'
    })
    file.pipe(res)
}
else{
    res.writeHead(206,{
        'content-type':'video/mp4',
        'content-length':filesize
    })
    fs.createReadStream(FilePath).pipe(res)
}
})

app.listen(3000,()=>{
    console.log(`Server listening at 3000`)
})