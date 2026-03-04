import { NextResponse } from "next/server";
import { Profile } from "../../../../../../mongodb/schema";
import jwt from 'jsonwebtoken'
import Auth from "@/app/auth/mongoauth";

export const GET=async(request)=>{
    try{
        const result=await Auth()

if(result.error){
    return NextResponse.json({
        error:result.error
    },{
        status:result.status
    })
}
const user=await Profile.findOne({_id:result.user.id}).select('-password')
if(!user){
      return NextResponse.json({
        error:`user not found`
    },{
        status:404
    })
}

return NextResponse.json({
    success:true,
    user
},{
    status:200
})
    }
    catch(error){
return NextResponse.json({
    error:error.message
})
    }
}