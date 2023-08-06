import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import TokenPayload from '@src/shared/api/auth/token-payload.dto';
import { API_TAG_AUTH } from '@src/shared/api/constant';
import { LoginQuery } from '../application/queries/impl';
import { User } from '../domain/user';
import { LocalAuthGuard } from './auth/local-auth.guard';

@ApiBearerAuth()
@ApiTags(API_TAG_AUTH)
@Controller('v1/auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiBody({ type: LoginQuery })
  async login(@Request() req: { user: User }) {
    const user = req.user;
    const payload: TokenPayload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
