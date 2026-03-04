import db from "./sql";
import jwt from 'jsonwebtoken'
import express from 'express'
import bcrypt from 'bcrypt'

const router=express.Router()

router.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body
    const query=`SELECT * FROM Profile WHERE email=?`
    const [user]= await db.execute(query,[email])
    if(!user || user.length==0){
 return res.status(401).json({error:`No user found`})
    }
        const checkPassword=await bcrypt.compare(password,user.password)
        if(!checkPassword){
    return res.status(401).json({error:`unautjorized user`})
        }
        const userdata={
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        }
    const token=jwt.sign(userdata,process.env.SECRET_PASS,{expiresIn:'2h'})
        return res.status(200).json({success:true, message:`Logged in successfully`,token})
    }
    catch(error){
    return res.status(500).json(`${error} +something went wrong`)

    }
})

export default router
