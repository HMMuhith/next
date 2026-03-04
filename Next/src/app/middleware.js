import { NextResponse } from "next/server";

export const middleware=(req)=>{

    const path=req.nextUrl.pathname

    const privatepath=path==='/order' || path==='/payment' || path==='/transaction' || path=='/signup'
    const token=req.cookies.get('Token')?.value

    if(privatepath && !token){
        return NextResponse.redirect(new URL('/login',req.url))
    }
    if(path==='/login' && token){
    return NextResponse.redirect(new URL('/',req.url))
    }
    return NextResponse.next()
}

export const config={
    matcher:'/:path*'
}

