/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'sample';

export interface MonsterDataById {
  id: number;
}

export interface MonsterData {
  id: number;
  name: string;
}

export const SAMPLE_PACKAGE_NAME = 'sample';

export interface MonsterServiceClient {
  findOne(request: MonsterDataById): Observable<MonsterData>;
}

export interface MonsterServiceController {
  findOne(
    request: MonsterDataById,
  ): Promise<MonsterData> | Observable<MonsterData> | MonsterData;
}

export function MonsterServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOne'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MonsterService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('MonsterService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MONSTER_SERVICE_NAME = 'MonsterService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
