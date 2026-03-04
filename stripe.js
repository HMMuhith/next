import Stripe from 'stripe'
import dotenv from 'dotenv'
import express from 'express'

const router=express.Router()

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

router.post('/gateway', async(req,res)=>{
    try{
    const {amount,currency}=req.body
    if(!amount){
        return res.status(400).json({message:`Amount required`})
    }
    const Payment=await stripe.paymentIntents.create(
        {
            amount:amount,
            currency:currency || 'usd',
payment_method_types:["card"],
metadata:{
    
}
        }
    )
    return res.status(200).json({
success:true,
clientsecret:Payment.client_secret,
paymentId:Payment.id
    })
}
catch(err){
res.status(400).json(err.message)
}
})

router.post('/verify', async(req,res)=>{
    try{
const {paymentId}=req.body
if(!paymentId){
    return res.status(400).json({message:`Payment Id required`})
}

const Payment=await stripe.paymentIntents.retrieve(paymentId)
if(Payment.status==='succeeded'){
    return res.status(201).json({message:`Payment done successfully`})
}
    }
    catch(err){
res.status(400).json(err.message)
    }
})