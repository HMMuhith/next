import fs from 'fs/promises'

const blob=new Blob(['Hello! world'],{type:'text/plain'})
const file= new File(['Hello! Muhith'],{
    type:'text/plain'
}
)

const arraybuffer=await file.arrayBuffer()
await fs.writeFile('hello.txt',Buffer.from(arraybuffer))