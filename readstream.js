import fs from 'fs'
import path from 'path'

async function Stream(){
const readStream= fs.createReadStream(path.join('File','hello.txt'))
readStream.on('data',(chunk)=>{
    console.log(chunk)
})
readStream.off('end',()=>{
    console.log('finished reading')
})
readStream.on('error',(err)=>{
    console.error(err)
})
}
Stream()
