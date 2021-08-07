import { Module } from '@nestjs/common';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
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
          protoPath: join(__dirname, 'protos/monster.proto'),
        },
      },
    ]),
  ],
  controllers: [MonsterController],
  providers: [MonsterService],
})
export class MonsterModule {}
