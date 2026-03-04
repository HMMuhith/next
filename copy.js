import fs from 'fs/promises'
import path from 'path'

async function MoveFile(){

    const FilePath=path.join(process.cwd(),"File")
    try {
        await fs.access(FilePath)
    } catch (error) {
        await fs.mkdir(FilePath)
    }
    const sourcefile=path.join(process.cwd(),'hello.txt')
    const destination=path.join('File','hello.txt')
    await fs.rename(sourcefile,destination)
}
MoveFile()