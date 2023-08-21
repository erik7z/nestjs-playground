import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request method:', req.method);
        console.log('Request URL:', req.originalUrl);
        next();
    }
}


// Alternative Middleware Functional Approach:
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request method:', req.method);
    console.log('Request URL:', req.originalUrl);
    next();
}