"use client";


import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "@/lib/axios";
import { useRefrestToken } from "./useRefreshToken";
import { getCookie } from '@/lib/cookies'

const useAxiosAuth = () => {


    const accessToken = getCookie('access_token')


    const refreshToken = useRefrestToken();




    useEffect(() => {



        const requestIntercept = axiosAuth.interceptors.request.use((config) => {

            console.log("config", config);

            if (accessToken && !config.headers["authorization"]) {

                config.headers["authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        },
            (error) => {
                return Promise.reject(error);
            }


        );


        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    await refreshToken();
                    const accessToken = getCookie('access_token')
                    prevRequest.headers["authorization"] = `Bearer ${accessToken}`;
                    return axiosAuth(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        }

    }, [accessToken]);

    return axiosAuth;

};

export default useAxiosAuth;

