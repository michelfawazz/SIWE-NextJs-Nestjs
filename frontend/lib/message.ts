import { SiweMessage } from 'siwe'
import axios from "@/lib/axios";



export async function verifySiwe(address: string) {

    const response = await axios.get(
        "/ethereum/nonce"
    )

    const messageToSign = new SiweMessage({
        domain: process.env.NEXT_PUBLIC_DOMAIN ||"localhost:3000",
        address: address,
        statement: "Sign in with Ethereum to the app",
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: response.data.nonce
    })

    return { messageToSign, nonce: response.data.nonce }

}





