import { join } from 'path';
import {Transport} from "@nestjs/microservices";

export const grpcOptions = {
  // url: 'localhost:5000',
  url: 'grpc-server:5000',
  package: 'sample',
  protoPath: [
    join(__dirname, 'hero/protos/hero.proto'),
    join(__dirname, 'monster/protos/monster.proto'),
  ],
};

// ??
export const op = {
  transport: Transport.GRPC,
  options: {
    // url: 'localhost:5000',
    url: 'grpc-server:5000',
    package: 'sample',
    protoPath: [
      join(__dirname, 'hero/protos/hero.proto'),
      join(__dirname, 'monster/protos/monster.proto'),
    ],
  },
};
