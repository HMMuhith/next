import Auth from "@/app/auth/sqlauth"
import db from "../../../../../../mysql/sql"
import { NextResponse } from "next/server"


export const POST=async(request)=>{
   try{
const {orderproducts,deliveryLocation}=await request.json()
const {user}=await Auth()


    const productsql=`SELECT * FROM Products WHERE productid=?`

    const ordersql=`INSERT INTO Orders (user,deliveryLocation) VALUES (?,?)`
    const [orders]=await db.execute(ordersql,[user.id,deliveryLocation])
    const orderid=orders.insertId
    for (let item of orderproducts){
        const [productrows]=await db.execute(productsql,[item.productid])
        const product=productrows[0]
      const insertsql=`INSERT INTO orderedproducts (orderid,productid,product_name,charge,quantity) VALUES (?,?,?,?,?)`
        await db.execute(insertsql,[orderid,product.productid,product.productname,product.price,item.quantity])
  }

return NextResponse.json({
    success:`Order created successfully`,
    orderid
},{
    status:201
})
   }
   catch(error){
    return NextResponse.json({
        success:`something went wrong`
    },
{
    status:500
})
   }
}