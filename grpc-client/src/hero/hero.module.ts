import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SAMPLE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          // url: 'localhost:5000',
          url: 'grpc-server:5000',
          package: 'sample',
          protoPath: join(__dirname, 'protos/hero.proto'),
        },
      },
    ]),
  ],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
