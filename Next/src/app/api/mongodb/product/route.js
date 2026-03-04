import { NextResponse } from "next/server";
import { Product } from "../../../../../../mongodb/schema";


export const POST=async(request)=>{
    try{
      const formData=await request.formData()
      const files=formData.getAll('image')
      const imageurl=[]
      
      for (let file of files){
        const buffer=Buffer.from(await file.arrayBuffer()).toString('base64')
 const mimeType=file.type
 imageurl.push(`data:${mimeType};base64,`+buffer)

      }
    
        
    const product= new Product({
 productname:formData.get('productname'),
        category:formData.get('category'),
        description:formData.get('description'),
        brand:formData.get('brand'),
        image:imageurl,
        size:formData.get('size'),
        stock:formData.get('stock'),
        location:formData.get('location'),
        price:formData.get('price'),
        discount:formData.get('discount'),
        couponcode:formData.get('couponcode'),
        sold:formData.get('sold'),
    
    
    })
   const result= await product.save()
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