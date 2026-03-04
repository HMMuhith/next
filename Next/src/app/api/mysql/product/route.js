import { NextResponse } from "next/server";
import db from "../../../../../mysql/sql";


export const POST=async(request)=>{
    try{
      const formData=await request.formData()
      const files=formData.getAll('image')
      const imagesql=`INSERT INTO Productimage (productid,image) VALUES (?,?)`
     
    

    const sql=`INSERT INTO Product (productname,category,
description,
brand,
size,
stock,
location,
price,
discount,
couponcode,
sold) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
   const [result]= await db.execute(sql,[formData.get('productname'),
formData.get('category'),
formData.get('description'),
formData.get('brand'),
formData.get('size'),
formData.get('stock'),
formData.get('location'),
formData.get('price'),
formData.get('discount'),
formData.get('couponcode'),
formData.get('sold'),])
const productid=result.insertId
 
      for (let file of files){
        const buffer=Buffer.from(await file.arrayBuffer()).toString('base64')
 const mimeType=file.type

const bufferimage=`data:${mimeType};base64,${buffer}`
await db.execute(imagesql,[productid,bufferimage])
      }
   return NextResponse.json({
    success:`product added successfully`,
    product:result
   },{
    status:201
   })
    }
    catch(error){
return NextResponse.json({
    error:`something went wrong`
},{
status:500
    })
    }
}