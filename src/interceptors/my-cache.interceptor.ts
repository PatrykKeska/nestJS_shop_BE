import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const method = context.getHandler();
    const cachedData = this.reflector.get<any>(`cacheData`, method);
    const cachedTime = this.reflector.get<Date>('cacheTime', method);
    if (cachedData && +cachedTime + 10000 > +new Date()) {
      console.log('Using cache data');
      return of(cachedData);
    } else {
      console.log('Generating a new data');
      return next.handle().pipe(
        tap((data) => {
          console.log(data);
        }),
      );
    }
  }
}
