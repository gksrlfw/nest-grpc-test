import { NestFactory } from '@nestjs/core';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import { grpcOptions } from './grpc-options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: grpcOptions,
  });
  await app.listen();
}
(async () => {
  await bootstrap();
  console.log('server');
})();
