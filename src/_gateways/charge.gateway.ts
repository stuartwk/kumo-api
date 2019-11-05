import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({namespace: 'charge'})
export class ChargeGateway implements OnGatewayConnection<SocketIO.Socket> {

  private logger: Logger = new Logger('ChargeGateway');
  @WebSocketServer() public readonly namespace: SocketIO.Namespace;

  @SubscribeMessage('leaveChargeRoom')
  async leaveChargeRoom(client: Socket, charge_id: string) {

    try {
      await client.leave(charge_id);
    } catch (error) {
      this.logger.error('error in leaveChargeRoom: ', error);
    }

    return;
  }

  handleConnection(client: Socket, ...args: any[]) {

    client.join(client.handshake.query.charge_id);

    // return { event: 'roomCreated', room: 'aRoom' };
    return;

  }

}
