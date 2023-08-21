import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {logger, LoggerMiddleware} from "./logger.middleware";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {AuthGuard} from "../../auth/auth.guard";
import {LoggingInterceptor} from "../../interceptors/logging.interceptor";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // Applying guards to a module:
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  // ],
  // Applying interceptors to a module:
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: LoggingInterceptor,
  //   },
  // ],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        // Alternative Middleware Functional Approach:
        // .apply(logger)
        .forRoutes(CatsController);
  }
}