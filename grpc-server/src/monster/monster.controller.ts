import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  MonsterData,
  MonsterDataById,
  MonsterServiceControllerMethods,
} from './protos/monster';

@Controller('monster')
@MonsterServiceControllerMethods()
export class MonsterController {
  /**
   * MonsterService findOne
   * @param data id
   * @param metadata metadata
   * @returns MonsterData
   */
  @GrpcMethod('MonsterService')
  findOne(data: MonsterDataById, metadata: any): MonsterData {
    console.log('server!!');
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ] as MonsterData[];
    const filteredItems = items.filter((item) => item.id === data.id);
    return filteredItems.length > 0 ? filteredItems[0] : ({} as MonsterData);
  }
}
