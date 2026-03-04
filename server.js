import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './mongodb/profile.js'
import otpRouter from './otp.js'
import emailRouter from './email.js'

dotenv.config()

const app=express()
const port=process.env.PORT || 8000


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/profile', userRouter)
app.use('/sendotp',otpRouter)
app.use('/verifyemail',emailRouter)



app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})