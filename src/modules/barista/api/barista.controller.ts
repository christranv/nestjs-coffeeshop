import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BaseController from '@src/shared/api/base-controller';
import { API_TAG_BARISTA } from '@src/shared/api/constant';

@ApiTags(API_TAG_BARISTA)
@Controller('v1/baristas')
export class BaristaController extends BaseController {
  @Get()
  async get() {
    return { "result": "OK" }
  }
}
