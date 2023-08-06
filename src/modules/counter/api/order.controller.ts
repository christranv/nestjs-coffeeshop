import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import Role from '@src/modules/user/domain/role.enum';
import { Roles } from '@src/shared/api/auth/roles.decorator';
import { RolesGuard } from '@src/shared/api/auth/roles.guard';
import TokenPayload from '@src/shared/api/auth/token-payload.dto';
import BaseController from '@src/shared/api/base-controller';
import { API_TAG_ORDER } from '@src/shared/api/constant';
import { TokenClaim } from '@src/shared/api/decorators/user.decorator';
import { plainToClass } from 'class-transformer';
import { GetFulfilledOrdersQuery } from '../application/queries/impl';
import { PlaceOrderCommand } from '../domain/commands/place-order.command';

@ApiTags(API_TAG_ORDER)
@UseGuards(RolesGuard)
@Controller('v1/orders')
export class OrderController extends BaseController {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    // super(ctx);
    super();
  }

  @Get("fulfilled")
  @Roles(Role.Admin)
  async getFulfilledOrders() {
    return await this.queryBus.execute(new GetFulfilledOrdersQuery);
  }

  @Post()
  async place(@TokenClaim() claim: TokenPayload, @Body() command: PlaceOrderCommand) {
    command.createdBy = claim.sub;
    await this.commandBus.execute(plainToClass(PlaceOrderCommand, command));
  }
}
