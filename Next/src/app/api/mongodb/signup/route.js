import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import Profile from '../../../../../mongodb/schema.js'

export const POST=async(request)=>{
const formData=await request.formData()
const name=formData.get('name')
const email=formData.get('email')
const photo=formData.get('photo')
const phone=formData.get('phone')
const isAdmin=formData.get('isAdmin')
const password=formData.get('password')
const user=await Profile.findOne({email})

if(user){
    return NextResponse.json({
        error:`user already exists`
    },
{
    status:409
})
}
const salt=await bcrypt.genSalt(12)
const hashedpassword=await bcrypt.hash(password,salt)
const registeruser=new Profile({
    name,
    email,
    photo,
    phone,
    isAdmin,
    password
})
const result= await registeruser.save()
return NextResponse.json({
    success:`signed in successfully`
},
{
    status:201
},
{
    user:result
})
}

