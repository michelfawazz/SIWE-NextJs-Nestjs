import { Controller,UseGuards,Post,Get,Req,Res } from '@nestjs/common';

import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private jwtService: JwtService) { }


    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refresh(@Req() req, @Res() res) {
        
        

        console.log(req,"refreshhhh")
        return res.status(200).json({hi:"hi"})
    

       
    }
}
