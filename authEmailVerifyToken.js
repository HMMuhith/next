import {google} from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()
const OauthClient= new google.auth.OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    process.env.REDIRECT_URI
)

const authURL= OauthClient.generateAuthUrl({
    access_type:'offline',
     prompt: 'consent',
    scope:['https://mail.google.com/']
})
console.log(authURL)
const code='4/0ASc3gC11dZyo8pImkQbo1FFtz11J_QpdYLcq7ggcFKzc9MQSKYotai5IL1zlT0igoFF_Rw'

async function genEmailVerify(){
    try{
    const {tokens}=await OauthClient.getToken(code)
console.log(tokens.refresh_token)
    }
    catch(err){
        console.log(err.message)
    }
}

genEmailVerify()