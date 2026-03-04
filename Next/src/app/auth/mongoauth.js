import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'
import jwt from 'jsonwebtoken'

const Auth=async(request)=>{
    try{
    const cookieStore=cookies()
    const token=  cookieStore?.get('Token')?.value
    if(!token){
return NextResponse.json({error:`unauthorized user`},{status:401})
}
let decode
try{
decode=jwt.verify(token,process.env.SECRET_PASS)

}
catch(error){
    return NextResponse.json({error:`invalid or expired token`},{status:401})
}
const user={id:decode.id,name:decode.name,email:decode.email,isAdmin:decode.isAdmin}

return { user,
status:200
}

    }
    catch(error){
return NextResponse.json({error:error.message},{
    status:500
})
    }
}

export default Auth
