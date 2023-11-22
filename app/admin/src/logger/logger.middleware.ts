import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    // Gets the request log
    this.logger.log({
      // headers: req.headers,
      body: req.body,
      originalUrl: req.originalUrl,
    });
    // Ends middleware function execution, hence allowing to move on
    if (next) {
      next();
    }
  }
}
