import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app=express()

app.get('/',async(req,res)=>{
    res.send('<button style="cursor:pointer;width:500px;border-radius:12px ;height:80px;border:none"><a href="/auth/google"><h1>Login with Google</h1></a></button>')
})

app.get('/auth/google',async(req,res)=>{
    try {
        const url=`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_LOGIN_CLIENTID}&redirect_uri=${process.env.LOGIN_REDIRECT_URI}&response_type=code&scope=email profile`

  res.redirect(url)
    } catch (error) {
        res.status(400).json({message:`Something went wrong`,error})
    }
})

app.get('/auth/google/callback', async(req,res)=>{
    const code=req.query.code
    try {
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id:process.env.GOOGLE_LOGIN_CLIENTID,
      client_secret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
      redirect_uri: process.env.LOGIN_REDIRECT_URI,
      grant_type: 'authorization_code',
      code: code
    })

    const token= tokenResponse.data.access_token

    const userinfo=await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
const data= userinfo.data
    res.send(`<h1>Login successful</h1></br>
        <p>username: ${data.name}</p>
        <p>email: ${data.email}</p>
        <img style="width:50px;height:50px;border-radius:1000px" referrerpolicy="no-referrer"
 src="${data.picture}" />
        `
    )
    } catch (error) {
        res.send(`Login error`)
    }
})

app.listen(3000,()=>{
    console.log(`Server listening at 3000`)
})