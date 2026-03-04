import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import express from 'express'

const router = express.Router()

function genOTP(){
  return Math.floor(10000+Math.random()*90000).toString()
}
async function sendOTP(toEmail,otp) {
    const oAuth2client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
    )
    
    oAuth2client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
    const accessToken=await oAuth2client.getAccessToken()
    const transport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken:accessToken.token
        }
    })
    console.log(accessToken.token)
   const result=await transport.sendMail({
    from:process.env.EMAIL,
    to:toEmail,
    subject:'OTP',
    text:'',
    html:`<h1>your otp is ${otp}</h1>`
   })
   console.log(result.response)
   return result
}

router.post('/', async (req, res) => {

    try {
const otp=genOTP()
const {email}=req.body
if(!email){
    return res.status(400).json({message:`email required`})
}
await sendOTP(email,otp)
return res.status(200).json({message:`otp ${otp} sent successfully`})
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}
)

export default router