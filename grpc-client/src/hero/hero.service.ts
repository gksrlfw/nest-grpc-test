import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  HERO_SERVICE_NAME,
  HeroData,
  HeroServiceClient,
  SAMPLE_PACKAGE_NAME,
} from './protos/hero';

@Injectable()
export class HeroService implements OnModuleInit {
  private heroService: HeroServiceClient;

  constructor(@Inject('SAMPLE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroService =
      this.client.getService<HeroServiceClient>(HERO_SERVICE_NAME);
  }

  getHeroData(): Observable<HeroData> {
    return this.heroService.findOne({ id: 1 });
  }
}
