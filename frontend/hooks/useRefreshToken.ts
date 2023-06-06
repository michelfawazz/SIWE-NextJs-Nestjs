"use client";

import { useSession } from "next-auth/react";
import axios from "@/lib/axios";
import { getCookie,setCookie } from '@/lib/cookies'
export const useRefrestToken = () => {
    const refresh_Token = getCookie('refresh_token')



    const refreshToken = async () => {


        const res = await axios.post("/user/refresh", {
            refresh_token: refresh_Token,
        });


        if (res.data.refresh_token != null || res.data.refresh_token != undefined) {
            console.log("refresh token")
            setCookie('refresh_token', res.data.refresh_token)
            setCookie('access_token', res.data.access_token)
            return res.data.access_token;
        
        }



    
    };

    return refreshToken;

}