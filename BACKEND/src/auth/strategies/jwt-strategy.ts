import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly clientService: ClientService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {




    console.log(payload)
    
    const client = await this.clientService.findByAddress(
      payload.ethAddress,
    );


    console.log(client)

    if (!client) throw new UnauthorizedException();
    return client;
  }
}