import express from 'express'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import { genJWTToken,Verifytoken } from './token.js'

const router=express.Router()
async function EmailVerify(toEmail) {
    const token=await genJWTToken(toEmail)
    const OauthClient = new google.auth.OAuth2(
        process.env.EMAIL_CLIENT_ID,
        process.env.EMAIL_CLIENT_SECRET,
        process.env.REDIRECT_URI
    )
    OauthClient.setCredentials({ refresh_token: process.env.GOOGLE_EMAIL_REFRESH_TOKEN })
    const accessToken = await OauthClient.getAccessToken()
    const transport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_EMAIL_REFRESH_TOKEN,
            accessToken: accessToken.token
        }
    })
    const result=await transport.sendMail({
        from:process.env.EMAIL,
        to:toEmail,
        subject:'Email verification',
        text:'',
        html:`<p>click here or paste the link to verify your email <a href='http://localhost:8000/verifyemail?token=${token}'>Verify Email</a></p>`
    })
    return result
}

router.post('/',async(req,res)=>{
    try{
    const {email}=req.body
    if(!email){
        return res.status(400).json({message:`Email required`})
    }
await EmailVerify(email)
return res.status(200).json({message:`A mail has been sent to your email `,email})
    }
    catch(err){
        res.status(400).json(err.message)
    }
})

router.get('/', async(req,res)=>{
    try{
    const {token}=req.query
    if(!token){
        return res.status(400).json({message:`token required`})
    }

await Verifytoken(token)
return res.status(200).json({message:`Email verified successfully`})
    }
    catch(err){
        return res.status(400).json({error:err.message})
    }
})

export default router