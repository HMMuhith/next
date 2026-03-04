import { NextResponse } from "next/server"
import {Profile} from '../../../../../mongodb/schema'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const POST=async(request)=>{
    const {email,password}=await request.json()
try{
    const user=await Profile.findOne({email})
    if(!user){
        return NextResponse.json({
            error:`user doesn't exist`
        },
    {
        status:404
    })
    }
    const checkPassword=await bcrypt.compare(password,user.password)
    if(!checkPassword){
        return NextResponse.json({
            error:`Password doesn't match`
        },
    {
        status:401
    })
    }
    const userdata={
        id:user._id,
        name:user.name,
        email:user.email
    }
    const token=await jwt.sign(userdata,process.env.SECRET_PASS,{expiresIn:60*60*24})
    const response= NextResponse.json({
        success:`logged in successfully`
    },{
        token
    })
    response.cookies.set(`Token`,token,{
        httpOnly:true,
        secure:true,
        maxAge:60*60*24
    })
    return response
    }
catch(error){
return NextResponse.json({
    error
})
}
}