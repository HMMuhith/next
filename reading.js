import fs from 'fs/promises'


async function Reading(){
    const data=await fs.readFile('demo.txt','utf-8')
    console.log(data)
}

Reading()