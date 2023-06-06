import { SignJWT, jwtVerify } from 'jose'



export const verifyAuth = async (token: string) => {  
    const secret = process.env.JWT_SECRET_KEY;
    console.log(token,"secret")
    try {
        const verifed = await jwtVerify(token as string, new TextEncoder().encode(secret));
        return verifed.payload;
        
    } catch (error) {
        throw new Error('Invalid token');
        
    }
}