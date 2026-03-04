import fs from 'fs/promises'
import path from 'path'

async function CreateFile(){
    const route=path.join(process.cwd(),'File')
try{
await fs.access(route)

}
catch(err){
      await  fs.mkdir(route,{recursive:true})

}
    
    const filePath=path.join('File','pdfFile.pdf')
    await fs.writeFile(filePath,'')
}

CreateFile()