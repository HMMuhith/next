import express from 'express'
import { Product, Profile } from './schema'
import multer from 'multer'
import Auth from './auth'

const router = express.Router()

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

router.post('/product', upload.array('image'),Auth, async (req, res) => {
    const {
        productname,category,description, brand,size,stock, location, price, discount,couponcode, sold, createdat }= req.body
    
    
        const newProduct= new Product({
           user:req.user.id, productname,category,description,brand,image:req?.files?.map(file=>file.path),
            size,stock,location,price,discount,couponcode,sold,createdat
        })

      const result=  await newProduct.save()
      return res.status(201).json({success:`Product added successfully`, product:result})
    }
    )

  