import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';

import { ClientService } from './client.service';
import { QueryFailedError } from 'typeorm';

import { clientInterface } from './client.dto';
import { SiweAuthGuard } from 'src/auth/guards/siwe-auth.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RefreshJwtGuard } from 'src/auth/guards/refresh-jwt-auth.guard';


@Controller('user')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @UseGuards(SiweAuthGuard)
    @Post("/signup")
    async signup(@Body() clientData: clientInterface, @Req() req, @Res() res) {
        console.log(clientData, "DATA")
        if (!clientData.username || !clientData.ethAddress) {
            return res.status(422).send('Missing fields');
        }


        try {

            //add user to db

            //then send back access token and refresh token

            const client = await this.clientService.insertClient(clientData);
            console.log("done inserting client", client)



            console.log("creating access")

            const { token, refresh } = await this.clientService.generateAccessToken(clientData);


            return res.status(200).send({ access_token: token, refresh_token: refresh });

        }




        catch (error) {
            if (error instanceof QueryFailedError) {

                return res.status(422).send('user already exists');

            }

            return res.status(500).send('Something went wrong');


        }



    }


    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refresh(@Req() req, @Res() res) {

        console.log(req.user.ethAddress,"reqqqqq")
        const client: clientInterface = {
            ethAddress: req.user.ethAddress,
        }

        const { token, refresh } = await this.clientService.generateAccessToken(client);
        return res.status(200).send({ access_token: token, refresh_token: refresh });

    }









    @UseGuards(SiweAuthGuard)
    @Post("signin")
    async login(@Body() clientData: clientInterface, @Req() req, @Res() res) {
        if (!clientData.ethAddress) {
            return res.status(422).send('Missing fields');
        }

        try {
            const client = await this.clientService.findByAddress(clientData.ethAddress);

            if (!client) {
                return res.status(422).send('user not found');
            }

            const { token, refresh } = await this.clientService.generateAccessToken(client);

            return res.status(200).send({ access_token: token, refresh_token: refresh });
        }
        catch (error) {
            return res.status(500).send('Something went wrong');
        }
    }



    @Get('/profile')
    @UseGuards(JwtGuard)
    async getProfile(@Req() req, @Res() res) {

        console.log(req)
        const client: clientInterface = {
            username: req.user.username,
            ethAddress: req.user.ethAddress,
        };


        return res.status(200).send(client);
    }




}












