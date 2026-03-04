import { google } from "googleapis";
import dotenv from 'dotenv'

dotenv.config()
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuthclient= new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,REDIRECT_URI
)

const authURL= oAuthclient.generateAuthUrl({
    access_type:'offline',
    scope:['https://mail.google.com/']
})
console.log(authURL)
const code='4/0ASc3gC0ddzkVVe-Q4umBzWaPtoIHyckxx7KiHUMRBjyrqQ9em-g7_nuoc-kqPncFsvxdNA'

async function genToken(){
    try{
const {tokens}= await oAuthclient.getToken(code)
console.log(tokens.refresh_token)
    }
    catch(err){
        console.log(err.message)
    }
}

genToken()