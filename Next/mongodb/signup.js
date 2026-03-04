import mongoose from "mongoose";
import { Profile } from "./schema";
import express from 'express';
import multer from "multer";
import bcrypt from 'bcrypt'

const router=express.Router()

const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'React/public')
    },
    filename:(req,file,cb)=>{
        cb(null,file?.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload=multer({storage:filestorage,fileFilter})

router.post('/signup',upload.single('photo'),async(req,res)=>{
    try{
    const user=await Profile.findOne({email:req.body.email})
    if(user){
        return res.statusCode(409).json({error:`user already exists`})
    }
    const salt=await bcrypt.genSalt(12)
    const password=await bcrypt.hash(req.body.password,salt)
const registeruser=new Profile({
    name:req.body.name,
    email:req.body.email,
    photo:req?.file?.filename,
    phone:req.body.phone,
    password,
    
})
const result=await registeruser.save()
return res.status(200).json({user:result})
    }
    catch(error){
return res.status(500).json({error:`something went wrong`})
    }
})



export default router