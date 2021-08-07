import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { MonsterModule } from './monster/monster.module';

@Module({
  imports: [HeroModule, MonsterModule],
})
export class AppModule {}
