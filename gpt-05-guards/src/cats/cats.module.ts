import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {logger, LoggerMiddleware} from "./logger.middleware";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../auth/auth.guard";

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