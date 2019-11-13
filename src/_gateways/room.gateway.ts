import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

/** SERVICES */
import { RoomService } from '../_services/room.service';
import { ConfigService } from '../config/config.service';

@WebSocketGateway({namespace: 'room'})
export class RoomGateway {

  private logger: Logger = new Logger('RoomGateway');

  constructor(private roomService: RoomService, private config: ConfigService) { }

  @SubscribeMessage('joinChatRoom')
  async joinChatRoom(client: Socket, {token}) {

    try {
      const secret = this.config.get('JWT_SECRET');
      const decoded = await jwt.verify(token, secret);
      const room = await this.roomService.findOne({id: decoded.room.id});

      if (room.isPrivate) {

        const hash = crypto.createHmac('sha256', decoded.room.password).digest('hex');

        if (hash === room.password) {

          await client.join(decoded.room.id);
          client.nsp.to(decoded.room.id).emit('userConnected', {user: decoded.user});

          return;
        } else {

          this.logger.log('uh oh, something went wrong');

          return;
        }

      } else {
        // just join it
      }

    } catch (err) {

      this.logger.error('join chat room jwt error: ');
      this.logger.error(err);

      return;

    }

  }

  @SubscribeMessage('sendMessage')
  async sendMessage(client: Socket, {token, message_content}) {

    try {
      const secret = this.config.get('JWT_SECRET');
      const decoded = await jwt.verify(token, secret);
      const room = await this.roomService.findOne({id: decoded.room.id});

      if (room.isPrivate) {

        const hash = crypto.createHmac('sha256', decoded.room.password).digest('hex');

        if (hash === room.password) {

          const res = {
            user: decoded.user,
            content: message_content,
            sent_at: Date.now(),
          };

          client.nsp.to(decoded.room.id).emit('message', res);

          return;
        } else {

          this.logger.error('uh oh, something went wrong: hash doesnt equal room pass');

          return;
        }

      } else {
        // just join it
      }

    } catch (err) {

      this.logger.error('send message: jwt error');
      this.logger.error(err);
      return;

    }

  }

  @SubscribeMessage('rollCall')
  async rollCall(client: Socket, {token}) {

    try {
      const secret = this.config.get('JWT_SECRET');
      const decoded = await jwt.verify(token, secret);
      const room = await this.roomService.findOne({id: decoded.room.id});

      if (room.isPrivate) {

        const hash = crypto.createHmac('sha256', decoded.room.password).digest('hex');

        if (hash === room.password) {
          client.nsp.to(decoded.room.id).emit('rollCall', {user: decoded.user});
          return;
        } else {

          this.logger.error('uh oh, something went wrong: hash doesnt equal pass');

          return;
        }

      } else {
        // just join it
      }

    } catch (err) {

      this.logger.error('roll call: jwt error');
      this.logger.error(err);
      return;

    }

    return;
  }

  handleDisconnect(client: Socket) {

    const room_id = client.handshake.query.room_id;
    const user_id = client.handshake.query.user_id;

    client.nsp.to(room_id).emit('userDisconnected', {user: {id: user_id}});

  }

}
