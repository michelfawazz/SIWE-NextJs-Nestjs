import withAuthorization from "./middlewares/withAuthorization";
import { NextMiddleware, NextRequest, NextResponse } from "next/server";

import { verifyAuth } from "./lib/auth";



export async function middleware(req: NextRequest) {

  const token = req.cookies.get("access_token")?.value
  const refresh = req.cookies.get("refresh_token")?.value
  const decoded = token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err)
    }))


  if (req.nextUrl.pathname.startsWith("/profile") && !decoded) {
    return NextResponse.redirect(new URL("/login", req.url))
  
  }

  if (req.url.includes("/login") && decoded) {
    return NextResponse.redirect(new URL("/profile", req.url))
  }
  if (req.url.includes("/signup") && decoded) {
    return NextResponse.redirect(new URL("/profile", req.url))
  }



}




export const config = {
  matcher: ["/profile", "/login", "/signup"]

}
