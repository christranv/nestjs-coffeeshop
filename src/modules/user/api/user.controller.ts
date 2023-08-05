import { Controller, HttpCode, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG_USER } from '@src/shared/api/constant';
import { LoginQuery } from '../application/queries/impl';

@ApiTags(API_TAG_USER)
@Controller('v1/users')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  @Post("login")
  @HttpCode(200)
  async login(query: LoginQuery) {
    return await this.queryBus.execute(query);
  }
}
