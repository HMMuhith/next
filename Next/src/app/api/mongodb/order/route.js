import Auth from "@/app/auth/mongoauth"
import { Orders, Product } from "../../../../../../mongodb/schema"
import { NextResponse } from "next/server"

export const POST=async(request)=>{
    try{
    const orderitems=[]
    const {orderproduct,deliveryLocation}=await request.json()
    const {user}=await Auth()

    for(let item of orderproduct){
        const product=await Product.findById(item._id)
        if(!product){
            return NextResponse.json({error:`No product found`},{
                status:409
            })
        }
        orderitems.push({
            productid:product._id,
product_name:product.productname,
productimage:product?.image[0] || null,
charge:product.price,
quantity:Number(item.quantity),
totalprice:Number(product.price*item.quantity)
        })

        
    }
    const amount=orderitems?.reduce((prev,current)=>{
        return prev+(current.totalprice)
    },0)

    const order=new Orders ({
user:user.id,
orderproduct:orderitems,
totalamount:amount,
deliveryLocation
    })
const result=await order.save()
    return NextResponse.json({
        success:`Order created successfully`,
        order:result
    },
{
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