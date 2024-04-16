import { NextRequest, NextResponse } from "next/server";


export {default} from 'next-auth/middleware'

import { getToken } from "next-auth/jwt";

export const middleware = async (req: NextRequest) => {

    const token = await getToken({ req });
const url = req.nextUrl;

if(token&&
    (
        url.pathname.startsWith('/signin')||
        url.pathname.startsWith('/signup')||
        url.pathname.startsWith('/verify')||
        url.pathname.startsWith('/')
    )
)

    return NextResponse.redirect(new URL('/dashboard', req.url))
    
}

export const config = {
    matcher: [
        '/signin',
        '/',
        '/dashboard/:path*',
        '/verify/:path*',
        '/signup'
    ]
}