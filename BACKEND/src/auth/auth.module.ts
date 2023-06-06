import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from 'src/client/client.entity';
import { ClientService } from 'src/client/client.service';
import { EthereumService } from 'src/ethereum/ethereum.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { SiweStrategy } from './strategies/siwe-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

import * as dotenv from 'dotenv';
dotenv.config()
@Module({
    providers: [ClientService,EthereumService,JwtStrategy,SiweStrategy,RefreshJwtStrategy ],
    imports: [
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '6h' },
      }),
      TypeOrmModule.forFeature([Client]),
    ],
  
  })
export class AuthModule {}
