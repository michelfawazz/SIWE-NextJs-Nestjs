import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from "src/client/client.service";
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor(
    private readonly clientService: ClientService,
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,


    })
  }

  async validate(payload: any) {
    
 


    const client = await this.clientService.findByAddress(
      payload.ethAddress,
    );

    if (!client) throw new UnauthorizedException();
    return client;
  }



}