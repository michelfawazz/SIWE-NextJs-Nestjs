import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EthereumController } from './ethereum/ethereum.controller';
import { ClientController } from './client/client.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { EthereumModule } from './ethereum/ethereum.module';


import { TypeOrmModule } from '@nestjs/typeorm';
import { EthereumService } from './ethereum/ethereum.service';
import { ClientService } from './client/client.service';




@Module({
  imports: [
    AuthModule, 
    EthereumModule,
    ClientModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'xborg',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ]
  
})
export class AppModule {}
