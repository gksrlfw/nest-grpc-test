import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  HeroData,
  HeroDataById,
  HeroServiceControllerMethods,
} from './protos/hero';

@Controller('hero')
@HeroServiceControllerMethods()
export class HeroController {
  /**
   * HeroService findOne
   * @param data id
   * @param metadata metadata
   * @returns HeroData
   */
  @GrpcMethod('HeroService')
  findOne(data: HeroDataById, metadata: any): HeroData {
    console.log('server!!');
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ] as HeroData[];
    const filteredItems = items.filter((item) => item.id === data.id);
    return filteredItems.length > 0 ? filteredItems[0] : ({} as HeroData);
  }
}
