import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RoomService } from '../_services/room.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as crypto from 'crypto';

@Injectable()
export class RoomAuthMiddleware implements NestMiddleware {

  constructor(private readonly roomService: RoomService) { }

  async use(req: Request, res: Response, next: NextFunction) {

    const password = req.body.password;
    const param = req.params[0];
    const split_params = param.split('/');
    const room_id = split_params[split_params.length - 1];
    const room = await this.roomService.findOne({id: room_id});

    if (!room) {
      throw new HttpException('Room not found.', HttpStatus.UNAUTHORIZED);
    }

    if (room.isPrivate) {

      if (!password) {
        throw new HttpException('No password present.', HttpStatus.UNAUTHORIZED);
      }

      const hash = crypto.createHmac('sha256', password).digest('hex');

      if (hash !== room.password) {
        throw new HttpException('Password mismatch.', HttpStatus.UNAUTHORIZED);
      }

    }

    next();

  }
}
