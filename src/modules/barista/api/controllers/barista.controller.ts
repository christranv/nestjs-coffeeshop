import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG_BARISTA } from '@src/shared/api/constant';

@ApiTags(API_TAG_BARISTA)
@Controller('v1/baristas')
export class BaristaController {
  @Get()
  @HttpCode(200)
  async get() {
    return { "result": "OK" }
  }
}
