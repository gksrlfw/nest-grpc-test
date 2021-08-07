import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MONSTER_SERVICE_NAME,
  MonsterData,
  MonsterServiceClient,
  SAMPLE_PACKAGE_NAME,
} from './protos/monster';

@Injectable()
export class MonsterService implements OnModuleInit {
  private monsterService: MonsterServiceClient;

  constructor(@Inject('SAMPLE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.monsterService =
      this.client.getService<MonsterServiceClient>(MONSTER_SERVICE_NAME);
  }

  getMonsterData(): Observable<MonsterData> {
    return this.monsterService.findOne({ id: 1 });
  }
}
