import { Controller, Get, Res, Req } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { Request, Response } from 'express';


@Controller('ethereum')
export class EthereumController {
    constructor(private readonly ethereumService: EthereumService) { }

    @Get("nonce")
    //get nonce req and response decorators
    async getNonce(@Req() req: Request, @Res() res: Response) {
        const nonce = await this.ethereumService.getNonce();
        console.log(nonce);

        return res.status(200).json({ nonce });
    }

}

