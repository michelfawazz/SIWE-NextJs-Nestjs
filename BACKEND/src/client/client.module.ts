import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthereumService} from 'src/ethereum/ethereum.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports:[TypeOrmModule.forFeature([Client])],
  providers: [ClientService, EthereumService, JwtService],
  controllers: [ClientController],
  
})
export class ClientModule {}
