import { NextResponse } from "next/server";
import db from '../../../../../../mysql/sql';
import Auth from "@/app/auth/sqlauth";

export const GET=async(request)=>{
    try{
        const result= await Auth()

if(result.error){
    return NextResponse.json({
        error:result.error
    },{
        status:401
    })
}

const sql=`SELECT * FROM Profile WHERE email=?`
const [rows]=await db.execute(sql,[result.user.email])

if(rows.length===0){
    return NextResponse.json({
        error:`user not found`
    },{
        status:404
    })
}
const user=rows[0]
delete user.password
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