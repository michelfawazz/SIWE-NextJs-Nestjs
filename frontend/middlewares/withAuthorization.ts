
import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from "next/server";

import { SignJWT, jwtVerify } from 'jose'



export default function withAuthorization(
    middleware: NextMiddleware,
    requireAuth: string[] = [],
    loginPages: string[] = []

) {
    const secret = process.env.JWT_SECRET_KEY;


    return async (request: NextRequest, next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (requireAuth.some((path) => pathname.startsWith(path))) {

            let token = request.cookies.get('access_token')?.value;
            

            try {
                const decoded = await jwtVerify(token as string, new TextEncoder().encode(secret));
                console.log(decoded, "success");




            } catch (error) {

            

                console.log(error);
                //remove access token from cookies
                const url = new URL(`/login`, request.url);
                url.searchParams.set("callbackUrl ", encodeURI(request.url));
                return NextResponse.redirect(url);


            }


        }

        if (loginPages.some((path) => pathname.startsWith(path))) {
            let token = request.cookies.get('access_token')?.value;

            try {
                const decoded = await jwtVerify(token as string, new TextEncoder().encode(secret));

                const url = new URL(`/profile`, request.url);
                return NextResponse.redirect(url);


            } catch (error) {
                console.log(error);



            }

        }







        return middleware(request, next);
    };
}
