import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { clientInterface } from './client.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class ClientService {
    //type orm find all clients by username by address insert 

    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        private readonly jwtService: JwtService,
    ) { }



    async findAll(): Promise<Client[]> {
        return await this.clientRepository.find();

    }



    async insertClient(client: clientInterface): Promise<Client> {
        console.log("inserting client")
        const newClient = await this.clientRepository.create(client);
        console.log(newClient,"new client")
        return await this.clientRepository.save(newClient);
    }


    async findByAddress(ethAddress: string): Promise<Client> {
        
        return await this.clientRepository.findOne({ where: { ethAddress } });
    }



    async generateAccessToken(clientData:  clientInterface){

        console.log(clientData,"ddd")
 
        const token =  this.jwtService.sign({
            ethAddress: clientData.ethAddress
        },
        {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: '12h',
        }
        );


        const refresh = this.jwtService.sign({
            ethAddress: clientData.ethAddress

        }
        ,
        {

            secret: process.env.JWT_SECRET_KEY,
            expiresIn: '1d',
        });



        console.log(token,"token")

        return {token,refresh}


    }











}
