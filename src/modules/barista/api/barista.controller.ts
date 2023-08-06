import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Role from '@src/modules/user/domain/role.enum';
import { Roles } from '@src/shared/api/auth/roles.decorator';
import { RolesGuard } from '@src/shared/api/auth/roles.guard';
import BaseController from '@src/shared/api/base-controller';
import { API_TAG_BARISTA } from '@src/shared/api/constant';

@UseGuards(RolesGuard)
@Roles(Role.Admin)
@ApiTags(API_TAG_BARISTA)
@Controller('v1/baristas')
export class BaristaController extends BaseController {
  @Get()
  async get() {
    return { "result": "OK" }
  }
}
