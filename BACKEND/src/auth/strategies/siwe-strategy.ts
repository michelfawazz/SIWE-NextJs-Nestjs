import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';





import { ethers } from 'ethers';

import { EthereumService} from 'src/ethereum/ethereum.service';

@Injectable()
export class SiweStrategy extends PassportStrategy(Strategy,"siwe") {
  constructor(
    private ethereumService: EthereumService
    
  ) {
    super();
  }

  async validate(req) {
    const { messageToSign, signature, nonce } = req.body;
    console.log(req.body,"body")
    if (!messageToSign || !signature || !nonce) throw new UnauthorizedException();
    
    const parsedMessage = await this.ethereumService.verifySignature(
      messageToSign,
      signature,
      nonce,
    );


    
    return parsedMessage;

   
  }
}