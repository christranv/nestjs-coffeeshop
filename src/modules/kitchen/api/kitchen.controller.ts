import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BaseController from '@src/shared/api/base-controller';
import { API_TAG_KITCHEN } from '@src/shared/api/constant';

@ApiTags(API_TAG_KITCHEN)
@Controller('v1/kitchens')
export class KitchenController extends BaseController {
  @Get()
  async get() {
    return "OK"
  }
}
