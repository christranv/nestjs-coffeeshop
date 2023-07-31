import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from '../../application/app.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(200)
  get(): object {
    return this.appService.get();
  }
}
