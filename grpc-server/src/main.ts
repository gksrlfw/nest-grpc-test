import { NestFactory } from '@nestjs/core';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      // url: 'localhost:5000',
      url: 'grpc-server:5000',
      package: 'sample',
      protoPath: join(__dirname, 'proto/sample.proto'), // 얘를 통해서 grpc가 알 수 있음
    },
  });
  await app.listen();
  // await app.listen(() => {
  //   console.log('app is running');
  // });
}
(async () => {
  await bootstrap();
  console.log('server');
})();

