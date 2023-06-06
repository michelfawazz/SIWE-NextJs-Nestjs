import { Module } from '@nestjs/common';
import { EthereumController } from './ethereum.controller';
import { EthereumService } from './ethereum.service';



@Module({
  controllers: [EthereumController],
  providers: [EthereumService],
  
})
export class EthereumModule {}
