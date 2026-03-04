import jwt from 'jsonwebtoken'


export async function genJWTToken(email){

const token= jwt.sign({email},process.env.JWT_SECRET,{expiresIn:60*5*1000})
return token
}

export async function Verifytoken(token){
    return jwt.verify(token,process.env.JWT_SECRET)
}

