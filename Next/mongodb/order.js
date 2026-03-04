import express from 'express'
import { Orders, Product } from './schema'
import Auth from './auth'

const router=express.Router()


const orderschema=new Schema({
    orderid:{
        type:mongoose.Schema.Types.ObjectId
    },
    user:{
        type:String,
        ref:''
    },
    orderproduct:[{
        product_name:{
            type:String,
        },
        productid:{
            type:String,
           ref:'Products'
        },
        productimage:{
            type:String,
            
        },
            charge:{
            type:Number
        },
        quantity:{
            type:Number,
            default:0
        },
        totalprice:{
            type:Number,
            default:0
        },
    }],

        createdAt:{
            type:Date,
            default:new Date().toLocaleString('en-NZ')
        },
    deliveryLocation:{
        type:String,
        required:true
    }
})

router.post('/order',Auth,async(req,res)=>{
    const orderitems=[]
    for (let item of req.body.orderproduct){
const product= await Product.findById(item._id)
if (!product) return res.status(404).json({ error: `Product not found: ${item._id}` });
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
const order= new Orders({
user:req.user.id,
orderproduct:orderitems,
totalamount:amount,
deliveryLocation:req.body.deliveryLocation
})

const result=await order.save()
return res.status(201).json({success:`order created successfully`, order:result})
})