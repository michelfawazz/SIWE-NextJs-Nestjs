import { Injectable } from '@nestjs/common';
import { generateNonce, SiweMessage } from 'siwe';

@Injectable()
export class EthereumService {


    //nonce generetion function
    getNonce() {
        console.log("generating nonce")
        return generateNonce();
    }


    async verifySignature(message: string, signature: string, nonce: string){
        const siweMessage = new SiweMessage(message);
        

        
        const isValidSignature = await siweMessage.verify({
            signature:signature,
            nonce: nonce
        
        }).catch(err => {
            console.log(err);
            return false;
        })
        return isValidSignature;

    
    }

}


