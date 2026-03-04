import jwt from 'jsonwebtoken'

const Auth=async(req,res,next)=>{
    try{
const token=req.cookies?.Token || (req.headers.authorization.startsWith('Bearer ')?req.headers?.authorization.split(' ')[1]: null)
if(!token){
return res.status(401).json({error:`unauthorized user`})
}
let decode
try{
decode=jwt.verify(token,process.env.SECRET_PASS)

}
catch(error){
    return res.status(401).json({error:`invalid or expired token`})
}
req.user={id:decode.id,name:decode.name,email:decode.email,isAdmin:decode.isAdmin}
if(!req.user.isAdmin || req.user.isAdmin){
    return next()
}
    }
    catch(error){
return res.status(500).json({error:error.message})
    }
}

export default Auth