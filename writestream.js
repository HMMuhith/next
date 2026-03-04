import fs from 'fs'
import path from 'path'


async function WriteStream(){
    
const write=await fs.createWriteStream(path.join('File','hello.txt'))
write.write('New text added')
write.write('\nagain new text added')
write.end()
write.on('finish',()=>{
    console.log('finished writing')
})
}
WriteStream()