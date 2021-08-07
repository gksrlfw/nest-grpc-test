import { Controller, Get, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';

import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  call() {
    console.log('client!!!');
    return this.heroService.getHeroData();
  }
}
