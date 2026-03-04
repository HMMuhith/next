import db from './sql'
import Auth from './auth'
import express from 'express'

const router=express.Router()

router.post('/order',Auth, async(req,res)=>{
    try{
    const {orderproducts,deliveryLocation}=req.body
const ordersql=`INSERT INTO Orders (user,deliveryLocation) VALUES (?,?)`
const [order]=await db.execute(ordersql,[req.user.id,deliveryLocation])
const orderid=order.insertId
    for(let item of orderproducts){
    const selectsql=`SELECT * FROM Products WHERE productid=?`
    const [productrows]=await db.execute(selectsql,[item.productid])
const product=productrows[0]
    const insertsql=`INSERT INTO orderedproducts (orderid,productid,product_name,charge,quantity) VALUES (?,?,?,?,?)`
await db.execute(insertsql,[orderid,product.productid,product.productname,product.price,item.quantity])

}
return res.status(201).json({success:`order created successfully`,orderid})
}
catch(error){
    return res.status(500).json({error:`something went wrong`})
}
})
