import mongoose from "mongoose";
import db from './sql';
import express from 'express';
import multer from "multer";
import bcrypt from 'bcrypt'

const router=express.Router()

const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'React/public')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file?.originalname)
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
        const {name,email,phone,password}=req.body
    const sql=`SELECT * FROM Profile WHERE email=?`
    const [rows]=await db.execute(sql,[req.body.email])
    if(rows.length > 0){
        return res.status(409).json({error:`user already exists`})
    }
    const salt=await bcrypt.genSalt(12)
    const hashedpassword=await bcrypt.hash(req.body.password,salt)

const insertsql=`INSERT INTO Profile (name, email, photo, phone, password) VALUES(?,?,?,?,?)`
const [registeruser]= await db.execute(insertsql,[req.body.name,
req.body.email,
req?.file?.filename,
req.body.phone,
hashedpassword])

return res.status(201).json({user:{id:registeruser.insertId,
    name,
    email,
    photo:req?.file?.filename,
    phone
}})
    }
    catch(error){
return res.status(500).json({error:`something went wrong`})
    }
})



export default router