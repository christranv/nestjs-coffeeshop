import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG_AUTH } from '@src/shared/api/constant';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@ApiTags(API_TAG_AUTH)
@Controller('v1/auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(
    private jwtService: JwtService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: any) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Get("test")
  async test() {
    return "OK";
  }
}
