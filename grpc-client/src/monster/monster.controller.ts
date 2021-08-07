import { Controller, Get } from '@nestjs/common';
import { MonsterService } from '../monster/monster.service';

@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Get()
  call() {
    console.log('client!!!');
    return this.monsterService.getMonsterData();
  }
}
