import express from 'express'
import Auth from './auth.js'
import {Profile} from './schema.js'

const router=express.Router()

router.get('/profile',Auth,async(req,res)=>{
    const user= await Profile.findOne({_id:req.user.id})
    if(!user){
        return res.status(401).json({error:`unauthorized user`})
    }
    return res.status(200).json(user)
})

  router.delete('/product',Auth,async(req,res)=>{
        const user=await Profile.findById(req.user.id)
        await user.remove()
        return res.status(200).json({success:`user and it's related all products deleted successfully`})
    })

export default router