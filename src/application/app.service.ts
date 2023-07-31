import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): object {
    return { test: 123 };
  }
}
