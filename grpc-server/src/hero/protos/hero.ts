/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'sample';

/**
 * array를 사용하려면 repeated
 * => repeated double data = 1;
 */
export interface HeroDataById {
  id: number;
}

export interface HeroData {
  /** 첫번째 인자 */
  id: number;
  /** 두번째 인자 */
  name: string;
}

export const SAMPLE_PACKAGE_NAME = 'sample';

/** 각 컨트롤러마다 service를 하나씩 선언한 */

export interface HeroServiceClient {
  /**
   * 각 컨트롤러의 모든 메서드에 rpc가 대응된다
   * input과 return 타입을 지정할 수 있
   */

  findOne(request: HeroDataById): Observable<HeroData>;
}

/** 각 컨트롤러마다 service를 하나씩 선언한 */

export interface HeroServiceController {
  /**
   * 각 컨트롤러의 모든 메서드에 rpc가 대응된다
   * input과 return 타입을 지정할 수 있
   */

  findOne(
    request: HeroDataById,
  ): Promise<HeroData> | Observable<HeroData> | HeroData;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOne'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('HeroService', method)(
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
      GrpcStreamMethod('HeroService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const HERO_SERVICE_NAME = 'HeroService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
