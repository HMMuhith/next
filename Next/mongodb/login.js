import express from 'express'
import { Profile } from './schema'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router=express.Router()

router.post('/login',async(req,res)=>{
    try{
    const user=await Profile.findOne({email:req.body.email})
    if(!user){
        return res.status(401).json({error:`No user found`})
    }
    const checkPassword=await bcrypt.compare(req.body.password,user.password)
    if(!checkPassword){
return res.status(401).json({error:`unautjorized user`})
    }
    const userdata={
        id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    }
const token=jwt.sign(userdata,process.env.SECRET_PASS,{expiresIn:'2h'})
    return res.status(201).json({success:true, message:`Logged in successfully`,token})
}
catch(error){
    return res.status(404).json(`something went wrong`)
}
})

export default router